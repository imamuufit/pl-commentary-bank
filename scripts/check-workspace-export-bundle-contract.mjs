import fs from 'node:fs';

const errors = [];
const packageJson = parseJson('package.json');
const scriptText = read('scripts/export-workspace-bundle.mjs');

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function parseJson(file) {
  const text = read(file);
  try {
    return JSON.parse(text);
  } catch (error) {
    errors.push(`${file}: invalid JSON: ${error.message}`);
    return {};
  }
}

function requireIncludes(text, needle, message) {
  if (!text.includes(needle)) errors.push(message);
}

if (packageJson.scripts?.['export:bundle'] !== 'node scripts/export-workspace-bundle.mjs') {
  errors.push('package.json must expose export:bundle');
}
if (!String(packageJson.scripts?.validate || '').includes('node scripts/check-workspace-export-bundle-contract.mjs')) {
  errors.push('package.json validate must include workspace export bundle contract');
}

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
