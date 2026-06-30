import fs from 'node:fs';

const errors = [];
const scriptText = read('scripts/generate-numata-completion-report.mjs');

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function requireIncludes(text, needle, target, message) {
  if (!text.includes(needle)) errors.push(`${target}: ${message}`);
}

function requireNotIncludes(text, needle, target, message) {
  if (text.includes(needle)) errors.push(`${target}: ${message}`);
}

requireIncludes(scriptText, "readJson('data/database.json')", 'scripts/generate-numata-completion-report.mjs', 'must inspect the main athlete database');
requireIncludes(scriptText, "readJson('data/research-candidates.json')", 'scripts/generate-numata-completion-report.mjs', 'must inspect separated research candidates');
requireIncludes(scriptText, "readJson('data/event-config.json')", 'scripts/generate-numata-completion-report.mjs', 'must inspect selected event configuration');
requireIncludes(scriptText, "String(history?.status || '').trim() === '確認済'", 'scripts/generate-numata-completion-report.mjs', 'confirmed history count must use normalized 確認済 status');
requireIncludes(scriptText, 'history.sourceIds.some', 'scripts/generate-numata-completion-report.mjs', 'confirmed history count must require nonblank sourceIds');
requireIncludes(scriptText, 'competitionName', 'scripts/generate-numata-completion-report.mjs', 'confirmed history count must require competition identity');
requireIncludes(scriptText, 'playersWithoutHistories', 'scripts/generate-numata-completion-report.mjs', 'report must expose players without histories');
requireIncludes(scriptText, 'playersWithoutConfirmedHistories', 'scripts/generate-numata-completion-report.mjs', 'report must expose players without confirmed histories');
requireIncludes(scriptText, 'playersWithPlaceholderText', 'scripts/generate-numata-completion-report.mjs', 'report must expose placeholder readout text count');
requireIncludes(scriptText, 'researchFirst', 'scripts/generate-numata-completion-report.mjs', 'report must produce a research priority queue');
requireIncludes(scriptText, 'candidateReview', 'scripts/generate-numata-completion-report.mjs', 'report must produce a candidate-review queue');
requireIncludes(scriptText, 'readoutRewrite', 'scripts/generate-numata-completion-report.mjs', 'report must produce a readout rewrite queue');

requireNotIncludes(scriptText, 'writeFileSync(path.join(root, \'data/database.json\'', 'scripts/generate-numata-completion-report.mjs', 'report must not rewrite database.json');
requireNotIncludes(scriptText, 'writeFileSync(path.join(root, \'data/research-candidates.json\'', 'scripts/generate-numata-completion-report.mjs', 'report must not rewrite research-candidates.json');
requireNotIncludes(scriptText, 'page(p)', 'scripts/generate-numata-completion-report.mjs', 'report must not touch print page rendering');
requireNotIncludes(scriptText, 'v5.9.6_LOCK =', 'scripts/generate-numata-completion-report.mjs', 'report must not alter layout lock semantics');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: Numata completion report contract is protected');
