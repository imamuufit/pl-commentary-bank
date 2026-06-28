import fs from 'node:fs';

const errors = [];
const packageText = read('package.json');
const scriptText = read('scripts/export-event-workspace.mjs');

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

requireIncludes(packageText, '"export:event-workspace": "node scripts/export-event-workspace.mjs"', 'package.json must expose export:event-workspace');
requireIncludes(packageText, 'node scripts/check-event-workspace-export-contract.mjs', 'npm run validate must include event workspace export contract');
requireIncludes(scriptText, "readJson('data/database.json')", 'event workspace export must read the canonical database');
requireIncludes(scriptText, "readJson('data/research-candidates.json')", 'event workspace export must read research candidates separately');
requireIncludes(scriptText, "readJson('data/event-config.json')", 'event workspace export must read event config');
requireIncludes(scriptText, "database.meta?.layoutTemplate === 'v5.9.6_LOCK'", 'event workspace export must protect the locked layout template');
requireIncludes(scriptText, 'eventConfig.printPolicy?.allowLayoutChange === false', 'event workspace export must reject layout-change event configs');
requireIncludes(scriptText, 'eventConfig.dataPolicy?.researchCandidatesStaySeparate === true', 'event workspace export must keep research candidates separate');
requireIncludes(scriptText, 'eventConfig.dataPolicy?.doNotInferAthleteHistory === true', 'event workspace export must preserve no-inference data policy');
requireIncludes(scriptText, "status === '確認済'", 'event workspace export must check confirmed-history source safety');
requireIncludes(scriptText, 'blockingIssues', 'event workspace export must surface blocking issues');
requireIncludes(scriptText, 'dist/event-workspace-export.json', 'event workspace export must write a stable output path');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: event workspace export contract is protected');
