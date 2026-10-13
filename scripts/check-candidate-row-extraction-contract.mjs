import fs from 'node:fs';

const errors = [];
const packageJson = readJson('package.json', 'package.json');
const database = readJson('data/database.json', 'database.json');
const researchCandidates = readJson('data/research-candidates.json', 'research-candidates.json');

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${label}: could not be read as JSON: ${error.message}`);
    return null;
  }
}

function requireValue(value, message) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

function hasCandidateOnlyGuard(value) {
  const text = String(value || '').toLowerCase();
  return (
    text.includes('candidate') ||
    text.includes('unconfirmed') ||
    text.includes('not promote') ||
    text.includes('no promotion') ||
    text.includes('未昇格') ||
    text.includes('未照合') ||
    text.includes('要再確認') ||
    text.includes('昇格しない')
  );
}

function isAllowedSourceUrl(url) {
  return (
    typeof url === 'string' &&
    (url.startsWith('https://h-power.sakura.ne.jp/') ||
      url.startsWith('https://www.jpa-powerlifting.or.jp/') ||
      url.startsWith('https://japanpowerlifting.org/') ||
      url.startsWith('https://www.powerlifting.sport/') ||
      url.startsWith('https://goodlift.info/'))
  );
}

function isConfirmedLike(value) {
  const text = String(value || '').toLowerCase();
  return (
    text === 'confirmed' ||
    text === '確認済' ||
    text.includes('confirmed history') ||
    text.includes('confirmed-history') ||
    text.includes('正本dbへ昇格済')
  );
}

if (packageJson) {
  if (packageJson.scripts?.['check:candidate-row-extraction'] !== 'node scripts/check-candidate-row-extraction-contract.mjs') {
    errors.push('package.json must expose check:candidate-row-extraction');
  }

  if (!String(packageJson.scripts?.validate || '').includes('node scripts/check-candidate-row-extraction-contract.mjs')) {
    errors.push('package.json validate must include the candidate row extraction contract');
  }
}

const playersById = new Map();
if (database) {
  if (!Array.isArray(database.players)) {
    errors.push('database.json: players must be an array');
  }

  for (const player of database.players || []) {
    if (!player?.id) {
      errors.push('database.json: player missing id');
      continue;
    }
    if (playersById.has(player.id)) errors.push(`database.json: duplicate player ${player.id}`);
    playersById.set(player.id, player);
  }
}

if (researchCandidates) {
  if (!Array.isArray(researchCandidates.candidates)) {
    errors.push('research-candidates.json: candidates must be an array');
  }

  const rowKeys = new Set();
  for (const candidate of researchCandidates.candidates || []) {
    const label = candidate?.candidateId || 'unknown candidate';
    const rows = candidate?.rowCandidates;

    if (rows === undefined) continue;
    if (!Array.isArray(rows)) {
      errors.push(`${label}: rowCandidates must be an array when present`);
      continue;
    }
    if (rows.length === 0) {
      errors.push(`${label}: rowCandidates must not be empty when present`);
      continue;
    }

    requireValue(candidate.playerId, `${label}: playerId is required for row extraction candidates`);
    requireValue(candidate.playerName, `${label}: playerName is required for row extraction candidates`);
    requireValue(candidate.promotionRule, `${label}: promotionRule is required for row extraction candidates`);

    if (candidate.promotionRule && !hasCandidateOnlyGuard(candidate.promotionRule)) {
      errors.push(`${label}: promotionRule must keep extracted rows candidate-only`);
    }

    if (candidate.status && isConfirmedLike(candidate.status)) {
      errors.push(`${label}: extracted row candidates must not be marked confirmed`);
    }

    const player = playersById.get(candidate.playerId);
    if (!player) {
      errors.push(`${label}: playerId ${candidate.playerId} must exist in database.json`);
    } else if (candidate.playerName && candidate.playerName !== player.name) {
      errors.push(`${label}: playerName must match database.json name for ${candidate.playerId}`);
    }

    for (const [index, row] of rows.entries()) {
      const rowLabel = `${label}.rowCandidates[${index}]`;
      requireValue(row?.sourceUrl, `${rowLabel}: sourceUrl is required`);
      requireValue(row?.sourceLabel, `${rowLabel}: sourceLabel is required`);
      requireValue(row?.eventDate, `${rowLabel}: eventDate is required`);
      requireValue(row?.eventName, `${rowLabel}: eventName is required`);
      requireValue(row?.venue, `${rowLabel}: venue is required`);
      requireValue(row?.eventType, `${rowLabel}: eventType is required`);
      requireValue(row?.athleteName, `${rowLabel}: athleteName is required`);
      requireValue(row?.bodyweightClass, `${rowLabel}: bodyweightClass is required`);
      requireValue(row?.promotionStatus, `${rowLabel}: promotionStatus is required`);

      if (row?.sourceUrl && !isAllowedSourceUrl(row.sourceUrl)) {
        errors.push(`${rowLabel}: sourceUrl must be an official HPA/JPA/IPF/Goodlift source`);
      }

      if (row?.promotionStatus && !hasCandidateOnlyGuard(row.promotionStatus)) {
        errors.push(`${rowLabel}: promotionStatus must keep the row candidate-only`);
      }

      if (isConfirmedLike(row?.status) || isConfirmedLike(row?.promotionStatus)) {
        errors.push(`${rowLabel}: row candidate must not be marked as confirmed history`);
      }

      if (row?.eventType === 'PL') {
        requireValue(row?.sqAttempts, `${rowLabel}: PL row must keep SQ attempts distinct`);
        requireValue(row?.bpAttempts, `${rowLabel}: PL row must keep BP attempts distinct`);
        requireValue(row?.dlAttempts, `${rowLabel}: PL row must keep DL attempts distinct`);
        requireValue(row?.total, `${rowLabel}: PL row must keep total distinct`);
      } else if (String(row?.eventType || '').includes('BP')) {
        requireValue(row?.bpAttempts, `${rowLabel}: bench row must keep BP attempts distinct`);
        requireValue(row?.bpBest, `${rowLabel}: bench row must keep BP best distinct`);
      } else if (row?.eventType) {
        errors.push(`${rowLabel}: eventType must distinguish PL from bench-only rows`);
      }

      const rowKey = [row?.sourceUrl, row?.eventDate, row?.eventName, row?.athleteName, row?.bodyweightClass].join('|');
      if (rowKeys.has(rowKey)) {
        errors.push(`${rowLabel}: duplicate extracted row candidate ${rowKey}`);
      }
      rowKeys.add(rowKey);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: candidate-only athlete/event row extraction contract is protected');
