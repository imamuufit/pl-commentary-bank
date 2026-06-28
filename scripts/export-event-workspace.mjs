import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_RELATIVE = 'dist/event-workspace-export.json';
const OUT_FILE = path.join(ROOT, OUT_RELATIVE);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function playerSort(a, b) {
  return String(a.group).localeCompare(String(b.group)) || Number(a.lot) - Number(b.lot);
}

function buildLinkedSourceCounts(database) {
  const counts = new Map();
  for (const player of database.players || []) {
    for (const history of player.histories || []) {
      for (const sourceId of history.sourceIds || []) {
        counts.set(sourceId, (counts.get(sourceId) || 0) + 1);
      }
    }
  }
  return counts;
}

function buildCandidateCounts(candidatesDb) {
  const counts = new Map();
  for (const candidate of candidatesDb.candidates || []) {
    counts.set(candidate.playerId, (counts.get(candidate.playerId) || 0) + 1);
  }
  return counts;
}

function buildEventWorkspaceExport(database, candidatesDb, eventConfig) {
  assert(database.meta?.layoutTemplate === 'v5.9.6_LOCK', 'database layoutTemplate must remain v5.9.6_LOCK');
  assert(eventConfig.printPolicy?.layoutTemplate === 'v5.9.6_LOCK', 'event printPolicy.layoutTemplate must remain v5.9.6_LOCK');
  assert(eventConfig.printPolicy?.allowLayoutChange === false, 'event printPolicy.allowLayoutChange must remain false');
  assert(eventConfig.dataPolicy?.verifiedHistoriesRequireSourceIds === true, 'verified histories must require sourceIds');
  assert(eventConfig.dataPolicy?.researchCandidatesStaySeparate === true, 'research candidates must stay separate');
  assert(eventConfig.dataPolicy?.doNotPromoteCandidatesAutomatically === true, 'candidates must not be promoted automatically');
  assert(eventConfig.dataPolicy?.doNotInferAthleteHistory === true, 'athlete history must not be inferred');

  const sourceIds = new Set((database.sources || []).map((source) => source.id));
  const linkedSourceCounts = buildLinkedSourceCounts(database);
  const candidateCounts = buildCandidateCounts(candidatesDb);
  const blockingIssues = [];

  for (const player of database.players || []) {
    for (const history of player.histories || []) {
      if (history.status === '確認済' && (!Array.isArray(history.sourceIds) || history.sourceIds.length === 0)) {
        blockingIssues.push({ type: 'confirmed-history-without-source', playerId: player.id, historyId: history.id });
      }
      for (const sourceId of history.sourceIds || []) {
        if (!sourceIds.has(sourceId)) blockingIssues.push({ type: 'unknown-source-id', playerId: player.id, historyId: history.id, sourceId });
      }
    }
  }

  for (const candidate of candidatesDb.candidates || []) {
    if (candidate.status === '確認済') {
      blockingIssues.push({ type: 'confirmed-candidate-not-promoted', candidateId: candidate.candidateId, playerId: candidate.playerId });
    }
  }

  return {
    meta: {
      exportVersion: '0.1.0',
      generatedAt: new Date().toISOString(),
      purpose: '大会単位運用の下準備。表示・印刷レイアウトや正本DBの意味は変更しない。'
    },
    event: eventConfig.event,
    printPolicy: eventConfig.printPolicy,
    dataPolicy: eventConfig.dataPolicy,
    counts: {
      players: (database.players || []).length,
      histories: (database.players || []).reduce((sum, player) => sum + (player.histories || []).length, 0),
      sources: (database.sources || []).length,
      researchCandidates: (candidatesDb.candidates || []).length,
      blockingIssues: blockingIssues.length
    },
    players: [...(database.players || [])].sort(playerSort).map((player) => ({
      id: player.id,
      group: player.group,
      lot: player.lot,
      name: player.name,
      kana: player.kana,
      entryDivision: player.entryDivision,
      team: player.team,
      bodyweightClass: player.bodyweightClass,
      histories: (player.histories || []).length,
      confirmedHistories: (player.histories || []).filter((history) => history.status === '確認済').length,
      researchCandidates: candidateCounts.get(player.id) || 0
    })),
    sources: (database.sources || []).map((source) => ({
      id: source.id,
      title: source.title,
      sourceType: source.sourceType,
      checkedAt: source.checkedAt,
      linkedHistories: linkedSourceCounts.get(source.id) || 0
    })),
    researchCandidates: (candidatesDb.candidates || []).map((candidate) => ({
      candidateId: candidate.candidateId,
      playerId: candidate.playerId,
      playerName: candidate.playerName,
      status: candidate.status,
      note: candidate.note,
      searchTerms: candidate.searchTerms || []
    })),
    blockingIssues
  };
}

const database = readJson('data/database.json');
const candidatesDb = readJson('data/research-candidates.json');
const eventConfig = readJson('data/event-config.json');
const exported = buildEventWorkspaceExport(database, candidatesDb, eventConfig);

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(exported, null, 2)}\n`);
console.log(`Wrote ${OUT_RELATIVE}`);
