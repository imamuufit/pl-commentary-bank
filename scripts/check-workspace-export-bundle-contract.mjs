import fs from 'node:fs';

const errors = [];
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scriptText = fs.readFileSync('scripts/export-workspace-bundle.mjs', 'utf8');

function requireIncludes(text, needle, message) {
  if (!String(text || '').includes(needle)) errors.push(message);
}

if (packageJson.scripts?.['export:bundle'] !== 'node scripts/export-workspace-bundle.mjs') {
  errors.push('package.json must expose export:bundle');
}
if (packageJson.scripts?.['check:export-bundle'] !== 'node scripts/check-workspace-export-bundle-contract.mjs') {
  errors.push('package.json must expose check:export-bundle');
}
requireIncludes(
  packageJson.scripts?.validate,
  'node scripts/check-workspace-export-bundle-contract.mjs',
  'package.json validate must include check-workspace-export-bundle-contract.mjs'
);

requireIncludes(scriptText, 'scripts/generate-workspace-health-report.mjs', 'workspace bundle must include the health report export');
requireIncludes(scriptText, 'scripts/export-source-registry.mjs', 'workspace bundle must include source registry export');
requireIncludes(scriptText, 'scripts/export-player-roster.mjs', 'workspace bundle must include player roster export');
requireIncludes(scriptText, 'scripts/export-event-workspace.mjs', 'workspace bundle must include event workspace export');
requireIncludes(scriptText, 'dist/workspace-export-bundle-manifest.json', 'workspace bundle must write a stable manifest path');
requireIncludes(scriptText, 'sha256', 'workspace bundle manifest must include output checksums');
requireIncludes(scriptText, "database.meta?.layoutTemplate !== 'v5.9.6_LOCK'", 'workspace bundle must protect the locked database layout template');
requireIncludes(scriptText, "eventConfig.printPolicy?.layoutTemplate !== 'v5.9.6_LOCK'", 'workspace bundle must protect the locked event print layout template');
requireIncludes(scriptText, 'eventConfig.printPolicy?.allowLayoutChange !== false', 'workspace bundle must protect allowLayoutChange false');
requireIncludes(scriptText, 'eventConfig.dataPolicy?.researchCandidatesStaySeparate !== true', 'workspace bundle must keep research candidates separate');
requireIncludes(scriptText, 'eventConfig.dataPolicy?.doNotInferAthleteHistory !== true', 'workspace bundle must preserve no-inference data policy');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: workspace export bundle contract is protected');
