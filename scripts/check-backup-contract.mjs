import fs from 'node:fs';

const errors = [];
const appText = read('src/app.js');

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function requireIncludes(needle, message) {
  if (!appText.includes(needle)) errors.push(`src/app.js: ${message}`);
}

requireIncludes("const WORKSPACE_BACKUP_VERSION='0.1.1'", 'workspace backup version must remain explicit');
requireIncludes('function workspaceBackup()', 'workspace backup exporter must remain present');
requireIncludes('database:db', 'workspace backup must include the confirmed database');
requireIncludes('researchCandidates:researchDb', 'workspace backup must include research candidates separately');
requireIncludes('eventConfig', 'workspace backup must include event config');
requireIncludes('function unwrapImportedWorkspace(json)', 'workspace backup importer must remain present');
requireIncludes('json?.database?.players', 'workspace importer must accept backup JSON with database.players');
requireIncludes('json?.players&&Array.isArray(json.players)', 'workspace importer must keep plain database.json compatibility');
requireIncludes('assertValidWorkspace(imported.database,imported.researchCandidates||researchDb', 'imported database must pass safety validation with candidates');
requireIncludes('if(imported.eventConfig)assertValidEventConfig(imported.eventConfig', 'imported event config must pass safety validation');
requireIncludes('if(imported.researchCandidates)researchDb=imported.researchCandidates', 'research candidates must restore only through the separated candidates store');
requireIncludes('if(imported.eventConfig)eventConfig=imported.eventConfig', 'event config must restore separately from athlete data');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: workspace backup/import contract is protected');
