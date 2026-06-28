import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const databasePath = process.argv[2] || 'data/database.json';
const outputPath = process.argv[3];
const database = JSON.parse(fs.readFileSync(path.resolve(root, databasePath), 'utf8'));

function requireValue(value, message, errors) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

function collectSourceRegistry() {
  const errors = [];
  const sources = database.sources || [];
  const players = database.players || [];
  const sourceIds = new Set();
  const linkedHistoriesBySource = new Map();

  if (database.meta?.layoutTemplate !== 'v5.9.6_LOCK') {
    errors.push('database meta.layoutTemplate must be v5.9.6_LOCK');
  }

  for (const source of sources) {
    requireValue(source.id, 'source missing id', errors);
    requireValue(source.title, `${source.id || 'unknown source'} missing title`, errors);
    requireValue(source.sourceType, `${source.id || 'unknown source'} missing sourceType`, errors);
    requireValue(source.checkedAt, `${source.id || 'unknown source'} missing checkedAt`, errors);
    if (source.id) {
      if (sourceIds.has(source.id)) errors.push(`duplicate source ${source.id}`);
      sourceIds.add(source.id);
      linkedHistoriesBySource.set(source.id, []);
    }
  }

  for (const player of players) {
    for (const history of player.histories || []) {
      if (history.status === '確認済' && (!Array.isArray(history.sourceIds) || history.sourceIds.length === 0)) {
        errors.push(`${player.id}/${history.id}: confirmed history must have sourceIds`);
      }
      for (const sourceId of history.sourceIds || []) {
        if (!sourceIds.has(sourceId)) {
          errors.push(`${player.id}/${history.id}: unknown sourceId ${sourceId}`);
          continue;
        }
        linkedHistoriesBySource.get(sourceId).push({
          playerId: player.id,
          lot: player.lot,
          name: player.name,
          historyId: history.id,
          date: history.date,
          competitionName: history.competitionName,
          status: history.status
        });
      }
    }
  }

  const registry = sources.map(source => {
    const linkedHistories = linkedHistoriesBySource.get(source.id) || [];
    return {
      id: source.id,
      title: source.title,
      url: source.url || '',
      sourceType: source.sourceType,
      checkedAt: source.checkedAt,
      memo: source.memo || '',
      linkedHistoryCount: linkedHistories.length,
      linkedHistories
    };
  });

  return {
    meta: {
      exportedAt: new Date().toISOString(),
      exportType: 'source-registry',
      databasePath,
      databaseVersion: database.meta?.version || null,
      databaseUpdatedAt: database.meta?.updatedAt || null,
      layoutTemplate: database.meta?.layoutTemplate || null
    },
    counts: {
      sources: registry.length,
      linkedHistories: registry.reduce((sum, source) => sum + source.linkedHistoryCount, 0),
      blockingIssues: errors.length
    },
    sources: registry,
    blockingIssues: errors
  };
}

const registry = collectSourceRegistry();
const output = `${JSON.stringify(registry, null, 2)}\n`;

if (outputPath) {
  fs.writeFileSync(path.resolve(root, outputPath), output);
  console.log(`Wrote ${outputPath}`);
} else {
  process.stdout.write(output);
}

if (registry.blockingIssues.length) {
  process.exitCode = 1;
}
