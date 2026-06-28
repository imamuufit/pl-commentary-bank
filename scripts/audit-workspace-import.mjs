import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('usage: node scripts/audit-workspace-import.mjs <database-or-workspace-backup.json>');
  process.exit(2);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    console.error(`import audit failed: could not read ${file}: ${error.message}`);
    process.exit(1);
  }
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function unwrapImportPayload(payload) {
  if (payload?.database?.players && Array.isArray(payload.database.players)) {
    return {
      kind: 'workspace-backup',
      database: payload.database,
      researchCandidates: Array.isArray(payload.researchCandidates?.candidates)
        ? payload.researchCandidates
        : { candidates: [] },
      eventConfig: payload.eventConfig && typeof payload.eventConfig === 'object' ? payload.eventConfig : null
    };
  }

  if (payload?.players && Array.isArray(payload.players)) {
    return {
      kind: 'database-json',
      database: payload,
      researchCandidates: { candidates: [] },
      eventConfig: null
    };
  }

  console.error('import audit failed: file must be database.json or a PL Commentary Bank workspace backup');
  process.exit(1);
}

function runNodeScript(script, args) {
  const result = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) process.exit(result.status || 1);
}

function importSummary(database, researchCandidates, eventConfig) {
  const histories = (database.players || []).flatMap(player => player.histories || []);
  const confirmedHistories = histories.filter(history => history.status === '確認済');
  const candidates = researchCandidates.candidates || [];
  const groups = new Set((database.players || []).map(player => player.group));

  return {
    layoutTemplate: database.meta?.layoutTemplate || null,
    databaseVersion: database.meta?.version || null,
    updatedAt: database.meta?.updatedAt || null,
    players: (database.players || []).length,
    groups: [...groups].sort(),
    histories: histories.length,
    confirmedHistories: confirmedHistories.length,
    sources: (database.sources || []).length,
    researchCandidates: candidates.length,
    eventId: eventConfig?.event?.eventId || null,
    eventName: eventConfig?.event?.name || null
  };
}

const payload = readJson(inputFile);
const imported = unwrapImportPayload(payload);
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pl-bank-import-audit-'));
const databaseFile = path.join(tempDir, 'database.json');
const candidatesFile = path.join(tempDir, 'research-candidates.json');

writeJson(databaseFile, imported.database);
writeJson(candidatesFile, imported.researchCandidates);
runNodeScript('scripts/validate-data.mjs', [databaseFile, candidatesFile]);

if (imported.eventConfig) {
  const eventFile = path.join(tempDir, 'event-config.json');
  writeJson(eventFile, imported.eventConfig);
  runNodeScript('scripts/check-event-config.mjs', [eventFile]);
}

console.log(JSON.stringify({
  ok: true,
  kind: imported.kind,
  summary: importSummary(imported.database, imported.researchCandidates, imported.eventConfig)
}, null, 2));
