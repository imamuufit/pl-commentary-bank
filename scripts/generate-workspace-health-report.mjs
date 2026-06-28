import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

const database = readJson('data/database.json');
const researchDb = readJson('data/research-candidates.json');
const eventConfig = readJson('data/event-config.json');

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items || []) {
    const key = keyFn(item) || '未設定';
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function collectReport() {
  const players = database.players || [];
  const sources = database.sources || [];
  const sourceIds = new Set(sources.map(source => source.id));
  const linkedSourceIds = new Set();
  const histories = [];
  const confirmedWithoutSources = [];
  const unknownSourceLinks = [];
  const duplicatePlayerIds = [];
  const duplicateHistoryIds = [];
  const playerIds = new Set();

  for (const player of players) {
    if (playerIds.has(player.id)) duplicatePlayerIds.push(player.id);
    playerIds.add(player.id);
    const historyIds = new Set();
    for (const history of player.histories || []) {
      histories.push({ player, history });
      if (historyIds.has(history.id)) duplicateHistoryIds.push({ playerId: player.id, historyId: history.id });
      historyIds.add(history.id);
      if (history.status === '確認済' && (!Array.isArray(history.sourceIds) || history.sourceIds.length === 0)) {
        confirmedWithoutSources.push({
          playerId: player.id,
          lot: player.lot,
          name: player.name,
          historyId: history.id,
          date: history.date,
          competitionName: history.competitionName
        });
      }
      for (const sourceId of history.sourceIds || []) {
        linkedSourceIds.add(sourceId);
        if (!sourceIds.has(sourceId)) {
          unknownSourceLinks.push({ playerId: player.id, historyId: history.id, sourceId });
        }
      }
    }
  }

  const candidatePlayerIds = new Set((researchDb.candidates || []).map(candidate => candidate.playerId));
  const candidatesForMissingPlayers = [...candidatePlayerIds]
    .filter(playerId => !playerIds.has(playerId))
    .sort();

  const confirmedCandidatesStillInResearch = (researchDb.candidates || [])
    .filter(candidate => candidate.status === '確認済')
    .map(candidate => ({
      candidateId: candidate.candidateId,
      playerId: candidate.playerId,
      playerName: candidate.playerName
    }));

  const unusedSources = sources
    .filter(source => !linkedSourceIds.has(source.id))
    .map(source => ({
      sourceId: source.id,
      title: source.title,
      sourceType: source.sourceType,
      checkedAt: source.checkedAt
    }));

  const blockingIssues = [
    ...confirmedWithoutSources.map(item => `confirmed history without sourceIds: ${item.playerId}/${item.historyId}`),
    ...unknownSourceLinks.map(item => `unknown source link: ${item.playerId}/${item.historyId}/${item.sourceId}`),
    ...duplicatePlayerIds.map(playerId => `duplicate player id: ${playerId}`),
    ...duplicateHistoryIds.map(item => `duplicate history id: ${item.playerId}/${item.historyId}`),
    ...confirmedCandidatesStillInResearch.map(item => `confirmed candidate still in research-candidates: ${item.candidateId}`),
    ...(database.meta?.layoutTemplate === 'v5.9.6_LOCK' ? [] : ['database meta.layoutTemplate is not v5.9.6_LOCK']),
    ...(eventConfig.printPolicy?.layoutTemplate === 'v5.9.6_LOCK' ? [] : ['eventConfig printPolicy.layoutTemplate is not v5.9.6_LOCK']),
    ...(eventConfig.printPolicy?.allowLayoutChange === false ? [] : ['eventConfig printPolicy.allowLayoutChange must be false'])
  ];

  return {
    generatedAt: new Date().toISOString(),
    files: {
      database: 'data/database.json',
      researchCandidates: 'data/research-candidates.json',
      eventConfig: 'data/event-config.json'
    },
    database: {
      version: database.meta?.version || null,
      updatedAt: database.meta?.updatedAt || null,
      layoutTemplate: database.meta?.layoutTemplate || null
    },
    event: {
      eventId: eventConfig.event?.eventId || null,
      name: eventConfig.event?.name || null,
      layoutTemplate: eventConfig.printPolicy?.layoutTemplate || null,
      allowLayoutChange: eventConfig.printPolicy?.allowLayoutChange ?? null
    },
    counts: {
      players: players.length,
      histories: histories.length,
      sources: sources.length,
      researchCandidates: (researchDb.candidates || []).length,
      unusedSources: unusedSources.length,
      blockingIssues: blockingIssues.length
    },
    historiesByStatus: countBy(histories, item => item.history.status),
    candidatesByStatus: countBy(researchDb.candidates || [], candidate => candidate.status),
    confirmedWithoutSources,
    unknownSourceLinks,
    duplicatePlayerIds,
    duplicateHistoryIds,
    confirmedCandidatesStillInResearch,
    candidatesForMissingPlayers,
    unusedSources,
    blockingIssues
  };
}

const report = collectReport();
const outputPath = process.argv[2];
const output = `${JSON.stringify(report, null, 2)}\n`;

if (outputPath) {
  fs.writeFileSync(path.resolve(root, outputPath), output);
  console.log(`Wrote ${outputPath}`);
} else {
  process.stdout.write(output);
}

if (report.blockingIssues.length) {
  process.exitCode = 1;
}
