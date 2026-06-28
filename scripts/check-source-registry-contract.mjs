import fs from 'node:fs';

const errors = [];

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${file} could not be read as JSON: ${error.message}`);
    return null;
  }
}

const database = readJson('data/database.json');

if (database) {
  if (!Array.isArray(database.sources)) errors.push('data/database.json: sources must be an array');
  if (!Array.isArray(database.players)) errors.push('data/database.json: players must be an array');

  const sourceIds = new Set();
  const usedSourceIds = new Set();

  for (const source of database.sources || []) {
    if (!source || typeof source !== 'object') {
      errors.push('data/database.json: source entries must be objects');
      continue;
    }

    for (const key of ['id', 'title', 'url', 'sourceType', 'checkedAt']) {
      if (!source[key]) errors.push(`${source.id || 'unknown source'}: source.${key} is required`);
    }

    if (source.id) {
      if (sourceIds.has(source.id)) errors.push(`${source.id}: duplicate source id`);
      sourceIds.add(source.id);
    }
  }

  for (const player of database.players || []) {
    for (const history of player.histories || []) {
      for (const sourceId of history.sourceIds || []) {
        usedSourceIds.add(sourceId);
        if (!sourceIds.has(sourceId)) errors.push(`${player.id}/${history.id}: sourceId ${sourceId} does not exist in sources`);
      }
    }
  }

  for (const sourceId of sourceIds) {
    if (!usedSourceIds.has(sourceId)) errors.push(`${sourceId}: source is not linked from any history`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: source registry contract is protected');
