import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

const database = readJson('data/database.json');
const researchDb = readJson('data/research-candidates.json');
const eventConfig = readJson('data/event-config.json');

const PLACEHOLDER_PATTERNS = [
  '過去出場歴は確認済みソースが取れたものから追加します',
  '前々回→前回は公式結果で確認できた履歴から更新します',
  '未確認は出場歴なしではなく'
];

function groupLotSort(a, b) {
  return String(a.group).localeCompare(String(b.group)) || Number(a.lot) - Number(b.lot);
}

function isConfirmed(history) {
  return String(history?.status || '').trim() === '確認済'
    && Array.isArray(history?.sourceIds)
    && history.sourceIds.some(sourceId => String(sourceId || '').trim().length > 0)
    && String(history?.competitionName || '').trim().length > 0
    && /^\d{4}-\d{2}-\d{2}$/.test(String(history?.date || ''));
}

function hasPlaceholderText(player) {
  const text = [player.readout, player.previousFlow, player.progressComment].join('\n');
  return PLACEHOLDER_PATTERNS.some(pattern => text.includes(pattern));
}

function countByGroup(players) {
  const groups = {};
  for (const player of players) {
    const key = player.group || '未設定';
    if (!groups[key]) {
      groups[key] = {
        players: 0,
        noHistories: 0,
        withHistories: 0,
        withConfirmedHistories: 0,
        withCandidates: 0,
        placeholderText: 0
      };
    }
    groups[key].players += 1;
    if (player.historyCount === 0) groups[key].noHistories += 1;
    if (player.historyCount > 0) groups[key].withHistories += 1;
    if (player.confirmedHistoryCount > 0) groups[key].withConfirmedHistories += 1;
    if (player.candidateCount > 0) groups[key].withCandidates += 1;
    if (player.hasPlaceholderText) groups[key].placeholderText += 1;
  }
  return groups;
}

function collectReport() {
  const candidatesByPlayer = new Map();
  for (const candidate of researchDb.candidates || []) {
    const key = candidate.playerId;
    if (!candidatesByPlayer.has(key)) candidatesByPlayer.set(key, []);
    candidatesByPlayer.get(key).push(candidate);
  }

  const players = [...(database.players || [])].sort(groupLotSort).map(player => {
    const histories = player.histories || [];
    const confirmedHistories = histories.filter(isConfirmed);
    const candidates = candidatesByPlayer.get(player.id) || [];
    return {
      playerId: player.id,
      group: player.group,
      lot: player.lot,
      name: player.name,
      kana: player.kana,
      bodyweightClass: player.bodyweightClass,
      team: player.team,
      entryDivision: player.entryDivision,
      declaredBest: player.declaredBest,
      historyCount: histories.length,
      confirmedHistoryCount: confirmedHistories.length,
      candidateCount: candidates.length,
      hasPlaceholderText: hasPlaceholderText(player),
      needsResearch: histories.length === 0 && candidates.length === 0,
      needsCandidateReview: candidates.length > 0 && confirmedHistories.length === 0,
      needsReadoutRewrite: hasPlaceholderText(player)
    };
  });

  const noHistories = players.filter(player => player.historyCount === 0);
  const noConfirmedHistories = players.filter(player => player.confirmedHistoryCount === 0);
  const withConfirmedHistories = players.filter(player => player.confirmedHistoryCount > 0);
  const withCandidates = players.filter(player => player.candidateCount > 0);
  const placeholderText = players.filter(player => player.hasPlaceholderText);

  return {
    generatedAt: new Date().toISOString(),
    files: {
      database: 'data/database.json',
      researchCandidates: 'data/research-candidates.json',
      eventConfig: 'data/event-config.json'
    },
    event: {
      eventId: eventConfig.event?.eventId || null,
      name: eventConfig.event?.name || null,
      dateFrom: eventConfig.event?.dateFrom || null,
      dateTo: eventConfig.event?.dateTo || null,
      layoutTemplate: eventConfig.printPolicy?.layoutTemplate || database.meta?.layoutTemplate || null
    },
    counts: {
      players: players.length,
      histories: players.reduce((sum, player) => sum + player.historyCount, 0),
      confirmedHistories: players.reduce((sum, player) => sum + player.confirmedHistoryCount, 0),
      researchCandidates: (researchDb.candidates || []).length,
      playersWithHistories: players.length - noHistories.length,
      playersWithoutHistories: noHistories.length,
      playersWithConfirmedHistories: withConfirmedHistories.length,
      playersWithoutConfirmedHistories: noConfirmedHistories.length,
      playersWithCandidates: withCandidates.length,
      playersWithPlaceholderText: placeholderText.length
    },
    groups: countByGroup(players),
    queues: {
      researchFirst: noHistories.map(player => `${player.group}.Lot ${player.lot} ${player.name}`),
      candidateReview: withCandidates.map(player => `${player.group}.Lot ${player.lot} ${player.name}`),
      readoutRewrite: placeholderText.map(player => `${player.group}.Lot ${player.lot} ${player.name}`)
    },
    players
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
