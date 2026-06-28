import fs from 'node:fs';

const errors = [];
const packageText = read('package.json');
const scriptText = read('scripts/export-workspace-bundle.mjs');

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function requireIncludes(text, needle, message) {
  if (!text.includes(needle)) errors.push(message);
}

requireIncludes(packageText, '"export:bundle": "node scripts/export-workspace-bundle.mjs"', 'package.json must expose export:bundle');
requireIncludes(packageText, 'node scripts/check-workspace-export-bundle-contract.mjs', 'npm run validate must include workspace export bundle contract');
requireIncludes(scriptText, 'scripts/generate-workspace-health-report.mjs', 'workspace bundle must include the health report export');
requireIncludes(scriptText, 'scripts/export-source-registry.mjs', 'workspace bundle must include source registry export');
requireIncludes(scriptText, 'scripts/export-player-roster.mjs', 'workspace bundle must include player roster export');
requireIncludes(scriptText, 'scripts/export-event-workspace.mjs', 'workspace bundle must include event workspace export');
requireIncludes(scriptText, 'dist/workspace-export-bundle-manifest.json', 'workspace bundle must write a stable manifest path');
requireIncludes(scriptText, 'sha256', 'workspace bundle manifest must include output checksums');
requireIncludes(scriptText, "database.meta?.layoutTemplate !== 'v5.9.6_LOCK'", 'workspace bundle must protect the locked database layout template');
requireIncludes(scriptText, "eventConfig.printPolicy?.layoutTemplate !== 'v5.9.6_LOCK'", 'workspace bundle must protect the locked event print layout template');
requireIncludes(scriptText, 'eventConfig.printPolicy?.allowLayoutChange !== false', 'workspace bundle must fail layout-changing event configs');
requireIncludes(scriptText, 'eventConfig.dataPolicy?.researchCandidatesStaySeparate !== true', 'workspace bundle must keep research candidates separate');
requireIncludes(scriptText, 'eventConfig.dataPolicy?.doNotInferAthleteHistory !== true', 'workspace bundle must preserve no-inference data policy');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: workspace export bundle contract is protected');
