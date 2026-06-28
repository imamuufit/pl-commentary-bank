import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const script = fs.readFileSync('scripts/audit-workspace-import.mjs', 'utf8');
const errors = [];

function requireIncludes(source, snippet, message) {
  if (!source.includes(snippet)) errors.push(message);
}

requireIncludes(packageJson.scripts?.validate || '', 'node scripts/check-import-audit-contract.mjs', 'package.json: validate must include import audit contract');
requireIncludes(packageJson.scripts?.['audit:import'] || '', 'node scripts/audit-workspace-import.mjs', 'package.json: audit:import script must exist');

requireIncludes(script, 'unwrapImportPayload', 'audit script must unwrap database.json and workspace backups');
requireIncludes(script, "kind: 'workspace-backup'", 'audit script must recognize workspace backups');
requireIncludes(script, "kind: 'database-json'", 'audit script must recognize standalone database.json files');
requireIncludes(script, 'scripts/validate-data.mjs', 'audit script must reuse canonical data validation');
requireIncludes(script, 'scripts/check-event-config.mjs', 'audit script must validate event config when present');
requireIncludes(script, 'layoutTemplate', 'audit summary must expose layoutTemplate');
requireIncludes(script, 'researchCandidates', 'audit summary must keep research candidates separate');
requireIncludes(script, 'confirmedHistories', 'audit summary must report confirmed history count');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: import audit contract is protected');
