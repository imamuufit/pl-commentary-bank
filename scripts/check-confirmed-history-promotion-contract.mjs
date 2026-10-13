import fs from 'node:fs';

const errors = [];
const packageJson = readJson('package.json', 'package.json');
const database = readJson('data/database.json', 'database.json');
const appText = readText('src/app.js');

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${label}: could not be read as JSON: ${error.message}`);
    return null;
  }
}

function readText(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file}: could not be read: ${error.message}`);
    return '';
  }
}

function requireValue(value, message) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

function includesAny(value, needles) {
  const text = String(value || '').toLowerCase();
  return needles.some((needle) => text.includes(needle));
}

function sourceLooksCandidateOnly(source) {
  return includesAny([source?.title, source?.sourceType, source?.memo, source?.url].join(' '), [
    'candidate',
    'source candidate',
    'research candidate',
    'row candidate',
    'candidate-only',
    'sokuhou',
    '速報',
    '未確認',
    '要再確認',
    '未昇格',
    '昇格しない',
  ]);
}

function historyLooksCandidateOnly(history) {
  return includesAny(
    [
      history?.status,
      history?.promotionStatus,
      history?.promotionRule,
      history?.candidateId,
      history?.rowCandidateId,
      history?.sourceStatus,
      history?.memo,
      history?.note,
      history?.recordNote,
    ].join(' '),
    [
      'candidate',
      'row candidate',
      'candidate-only',
      'sokuhou',
      '速報',
      '未確認',
      '要再確認',
      '未昇格',
      '昇格しない',
    ],
  );
}

if (packageJson) {
  if (
    packageJson.scripts?.['check:confirmed-history-promotion'] !==
    'node scripts/check-confirmed-history-promotion-contract.mjs'
  ) {
    errors.push('package.json must expose check:confirmed-history-promotion');
  }

  if (!String(packageJson.scripts?.validate || '').includes('node scripts/check-confirmed-history-promotion-contract.mjs')) {
    errors.push('package.json validate must include the confirmed history promotion contract');
  }
}

if (!appText.includes("history.status==='確認済'&&(!Array.isArray(history.sourceIds)||history.sourceIds.length===0)")) {
  errors.push('src/app.js: confirmed histories must continue to fail validation without sourceIds');
}

if (!appText.includes('confirmed items must be promoted to database.json or downgraded from research-candidates')) {
  errors.push('src/app.js: research candidates must not silently become confirmed histories');
}

if (database) {
  if (!Array.isArray(database.players)) errors.push('database.json: players must be an array');
  if (!Array.isArray(database.sources)) errors.push('database.json: sources must be an array');

  const sourcesById = new Map();
  for (const source of database.sources || []) {
    requireValue(source?.id, 'database.json: source missing id');
    if (source?.id) {
      if (sourcesById.has(source.id)) errors.push(`database.json: duplicate source ${source.id}`);
      sourcesById.set(source.id, source);
    }
  }

  for (const player of database.players || []) {
    const histories = player?.histories;
    if (!Array.isArray(histories)) {
      errors.push(`${player?.id || 'unknown player'}: histories must be an array`);
      continue;
    }

    for (const history of histories) {
      const label = `${player?.id || 'unknown player'}/${history?.id || 'unknown history'}`;
      if (history?.status !== '確認済') continue;

      if (!Array.isArray(history.sourceIds) || history.sourceIds.length === 0) {
        errors.push(`${label}: confirmed history must have sourceIds`);
      }

      if (historyLooksCandidateOnly(history)) {
        errors.push(`${label}: confirmed history must not retain candidate-only, 速報, or promotion-pending markers`);
      }

      for (const sourceId of history.sourceIds || []) {
        const source = sourcesById.get(sourceId);
        if (!source) {
          errors.push(`${label}: unknown sourceId ${sourceId}`);
          continue;
        }
        if (sourceLooksCandidateOnly(source)) {
          errors.push(`${label}: sourceId ${sourceId} is candidate-only or 速報-like and must not support confirmed history`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: confirmed history promotion guardrail is protected');
