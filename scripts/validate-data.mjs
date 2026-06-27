import fs from 'node:fs';

const dbFile = process.argv[2] || 'data/database.json';
const candidatesFile = process.argv[3] || 'data/research-candidates.json';
const errors = [];
const warnings = [];

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${label} could not be read: ${error.message}`);
    return null;
  }
}

function requireValue(value, message) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

const db = readJson(dbFile, 'database');
const researchDb = fs.existsSync(candidatesFile) ? readJson(candidatesFile, 'research candidates') : { candidates: [] };

if (db) {
  if (!db.meta) errors.push('meta is required');
  if (db.meta?.layoutTemplate !== 'v5.9.6_LOCK') errors.push('layoutTemplate must be v5.9.6_LOCK');
  if (!Array.isArray(db.players)) errors.push('players must be array');
  if (!Array.isArray(db.sources)) errors.push('sources must be array');

  const playerIds = new Set();
  const sourceIds = new Set();

  for (const source of db.sources || []) {
    requireValue(source.id, 'source missing id');
    if (source.id) {
      if (sourceIds.has(source.id)) errors.push(`duplicate source ${source.id}`);
      sourceIds.add(source.id);
    }
    requireValue(source.title, `${source.id || 'unknown source'} missing title`);
    requireValue(source.sourceType, `${source.id || 'unknown source'} missing sourceType`);
    requireValue(source.checkedAt, `${source.id || 'unknown source'} missing checkedAt`);
  }

  for (const player of db.players || []) {
    for (const key of ['id', 'group', 'lot', 'name', 'kana', 'histories']) {
      requireValue(player[key], `${player.id || 'unknown player'} missing ${key}`);
    }

    if (player.id) {
      if (playerIds.has(player.id)) errors.push(`duplicate player ${player.id}`);
      playerIds.add(player.id);
    }

    if (!/^[A-Z]$/.test(String(player.group))) errors.push(`${player.id}: group must be one uppercase letter`);
    if (!Number.isInteger(Number(player.lot))) errors.push(`${player.id}: lot must be numeric`);
    if (!Array.isArray(player.histories)) {
      errors.push(`${player.id}: histories must be array`);
      continue;
    }

    const historyIds = new Set();
    for (const history of player.histories) {
      requireValue(history.id, `${player.id}: history missing id`);
      if (history.id) {
        if (historyIds.has(history.id)) errors.push(`${player.id}: duplicate history ${history.id}`);
        historyIds.add(history.id);
      }
      for (const key of ['date', 'competitionName', 'grade', 'eventType', 'className', 'status']) {
        requireValue(history[key], `${player.id}/${history.id || 'unknown history'} missing ${key}`);
      }
      if (history.status === '確認済') {
        if (!Array.isArray(history.sourceIds) || history.sourceIds.length === 0) {
          errors.push(`${player.id}/${history.id}: confirmed history must have sourceIds`);
        }
      }
      for (const sourceId of history.sourceIds || []) {
        if (!sourceIds.has(sourceId)) errors.push(`${player.id}/${history.id}: unknown sourceId ${sourceId}`);
      }
    }
  }

  if (researchDb) {
    if (!Array.isArray(researchDb.candidates)) errors.push('research candidates must be array');
    const candidateIds = new Set();
    for (const candidate of researchDb.candidates || []) {
      requireValue(candidate.candidateId, 'candidate missing candidateId');
      if (candidate.candidateId) {
        if (candidateIds.has(candidate.candidateId)) errors.push(`duplicate candidate ${candidate.candidateId}`);
        candidateIds.add(candidate.candidateId);
      }
      requireValue(candidate.playerId, `${candidate.candidateId || 'unknown candidate'} missing playerId`);
      requireValue(candidate.playerName, `${candidate.candidateId || 'unknown candidate'} missing playerName`);
      requireValue(candidate.status, `${candidate.candidateId || 'unknown candidate'} missing status`);
      requireValue(candidate.note, `${candidate.candidateId || 'unknown candidate'} missing note`);
      if (candidate.playerId && !playerIds.has(candidate.playerId)) errors.push(`${candidate.candidateId}: unknown playerId ${candidate.playerId}`);
      if (candidate.status === '確認済') errors.push(`${candidate.candidateId}: confirmed items must be promoted to database.json or downgraded from research-candidates`);
      if (!Array.isArray(candidate.searchTerms) || candidate.searchTerms.length === 0) warnings.push(`${candidate.candidateId}: searchTerms is empty`);
    }
  }

  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }

  for (const warning of warnings) console.warn(`WARN: ${warning}`);
  console.log(`OK: ${db.players.length} players, ${db.sources.length} sources, ${researchDb?.candidates?.length || 0} candidates`);
}
