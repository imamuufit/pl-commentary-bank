import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const manifestPath = path.join(distDir, 'workspace-export-bundle-manifest.json');

const exportsToRun = [
  {
    name: 'health-report',
    command: ['node', 'scripts/generate-workspace-health-report.mjs', 'dist/workspace-health-report.json'],
    output: 'dist/workspace-health-report.json'
  },
  {
    name: 'source-registry',
    command: ['node', 'scripts/export-source-registry.mjs', 'data/database.json', 'dist/source-registry-export.json'],
    output: 'dist/source-registry-export.json'
  },
  {
    name: 'player-roster',
    command: ['node', 'scripts/export-player-roster.mjs', 'data/database.json', 'data/research-candidates.json', 'dist/player-roster-export.json'],
    output: 'dist/player-roster-export.json'
  },
  {
    name: 'event-workspace',
    command: ['node', 'scripts/export-event-workspace.mjs'],
    output: 'dist/event-workspace-export.json'
  }
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function sha256(relativePath) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(root, relativePath)))
    .digest('hex');
}

function assertSafeInputs(database, eventConfig) {
  const errors = [];

  if (database.meta?.layoutTemplate !== 'v5.9.6_LOCK') {
    errors.push('database meta.layoutTemplate must remain v5.9.6_LOCK');
  }
  if (eventConfig.printPolicy?.layoutTemplate !== 'v5.9.6_LOCK') {
    errors.push('event printPolicy.layoutTemplate must remain v5.9.6_LOCK');
  }
  if (eventConfig.printPolicy?.allowLayoutChange !== false) {
    errors.push('event printPolicy.allowLayoutChange must remain false');
  }
  if (eventConfig.dataPolicy?.researchCandidatesStaySeparate !== true) {
    errors.push('research candidates must stay separate from canonical histories');
  }
  if (eventConfig.dataPolicy?.doNotInferAthleteHistory !== true) {
    errors.push('athlete history inference must remain disabled');
  }

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
}

function runExport(item) {
  execFileSync(item.command[0], item.command.slice(1), {
    cwd: root,
    stdio: 'inherit'
  });

  if (!fs.existsSync(path.join(root, item.output))) {
    throw new Error(`${item.output} was not created`);
  }

  return {
    name: item.name,
    path: item.output,
    sha256: sha256(item.output),
    bytes: fs.statSync(path.join(root, item.output)).size
  };
}

fs.mkdirSync(distDir, { recursive: true });

const database = readJson('data/database.json');
const eventConfig = readJson('data/event-config.json');
assertSafeInputs(database, eventConfig);

const generated = exportsToRun.map(runExport);
const manifest = {
  meta: {
    exportVersion: '0.1.0',
    generatedAt: new Date().toISOString(),
    purpose: 'PL Commentary Bank workspace export bundle. This is export-only and must not change layout or canonical data semantics.'
  },
  inputs: {
    database: 'data/database.json',
    researchCandidates: 'data/research-candidates.json',
    eventConfig: 'data/event-config.json',
    layoutTemplate: database.meta?.layoutTemplate || null,
    databaseVersion: database.meta?.version || null,
    databaseUpdatedAt: database.meta?.updatedAt || null
  },
  generated
};

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, manifestPath)}`);
