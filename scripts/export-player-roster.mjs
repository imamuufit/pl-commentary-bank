import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const databasePath = process.argv[2] || 'data/database.json';
const candidatesPath = process.argv[3] || 'data/research-candidates.json';
const outputPath = process.argv[4];
const database = JSON.parse(fs.readFileSync(path.resolve(root, databasePath), 'utf8'));
const researchCandidates = fs.existsSync(path.resolve(root, candidatesPath))
  ? JSON.parse(fs.readFileSync(path.resolve(root, candidatesPath), 'utf8'))
  : { candidates: [] };

function requireValue(value, message, errors) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

function collectRoster() {
  const errors = [];
  const players = database.players || [];
  const candidates = researchCandidates.candidates || [];
  const playerIds = new Set();
  const candidateCounts = new Map();

  if (database.meta?.layoutTemplate !== 'v5.9.6_LOCK') {
    errors.push('database meta.layoutTemplate must be v5.9.6_LOCK');
  }

  for (const candidate of candidates) {
    requireValue(candidate.candidateId, 'candidate missing candidateId', errors);
    requireValue(candidate.playerId, `${candidate.candidateId || 'unknown candidate'} missing playerId`, errors);
    requireValue(candidate.status, `${candidate.candidateId || 'unknown candidate'} missing status`, errors);
    if (candidate.status === '確認済') {
      errors.push(`${candidate.candidateId}: confirmed items must not remain in research-candidates`);
    }
    if (candidate.playerId) {
      candidateCounts.set(candidate.playerId, (candidateCounts.get(candidate.playerId) || 0) + 1);
    }
  }

  const roster = [...players]
    .sort((a, b) => String(a.group).localeCompare(b.group) || Number(a.lot) - Number(b.lot))
    .map(player => {
      requireValue(player.id, 'player missing id', errors);
      requireValue(player.group, `${player.id || 'unknown player'} missing group`, errors);
      requireValue(player.lot, `${player.id || 'unknown player'} missing lot`, errors);
      requireValue(player.name, `${player.id || 'unknown player'} missing name`, errors);
      requireValue(player.kana, `${player.id || 'unknown player'} missing kana`, errors);
      if (player.id) {
        if (playerIds.has(player.id)) errors.push(`duplicate player ${player.id}`);
        playerIds.add(player.id);
      }
      const histories = player.histories || [];
      return {
        id: player.id,
        group: player.group,
        lot: player.lot,
        name: player.name,
        kana: player.kana,
        englishName: player.englishName || '',
        sex: player.sex || '',
        bodyweightClass: player.bodyweightClass || '',
        team: player.team || '',
        entryDivision: player.entryDivision || '',
        declaredBest: player.declaredBest || '',
        historyCount: histories.length,
        confirmedHistoryCount: histories.filter(history => history.status === '確認済').length,
        researchCandidateCount: candidateCounts.get(player.id) || 0
      };
    });

  for (const candidate of candidates) {
    if (candidate.playerId && !playerIds.has(candidate.playerId)) {
      errors.push(`${candidate.candidateId}: unknown playerId ${candidate.playerId}`);
    }
  }

  return {
    meta: {
      exportedAt: new Date().toISOString(),
      exportType: 'player-roster',
      databasePath,
      candidatesPath,
      databaseVersion: database.meta?.version || null,
      databaseUpdatedAt: database.meta?.updatedAt || null,
      layoutTemplate: database.meta?.layoutTemplate || null
    },
    counts: {
      players: roster.length,
      histories: roster.reduce((sum, player) => sum + player.historyCount, 0),
      confirmedHistories: roster.reduce((sum, player) => sum + player.confirmedHistoryCount, 0),
      researchCandidates: candidates.length,
      blockingIssues: errors.length
    },
    players: roster,
    blockingIssues: errors
  };
}

const roster = collectRoster();
const output = `${JSON.stringify(roster, null, 2)}\n`;

if (outputPath) {
  fs.writeFileSync(path.resolve(root, outputPath), output);
  console.log(`Wrote ${outputPath}`);
} else {
  process.stdout.write(output);
}

if (roster.blockingIssues.length) {
  process.exitCode = 1;
}
