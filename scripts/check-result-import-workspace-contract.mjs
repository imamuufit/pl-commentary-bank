import fs from 'node:fs';

const errors = [];
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const indexHtml = fs.readFileSync('index.html', 'utf8');
const sw = fs.readFileSync('sw.js', 'utf8');
const script = fs.readFileSync('src/result-import-workspace.js', 'utf8');
const css = fs.readFileSync('src/result-import-workspace.css', 'utf8');

function requireIncludes(text, needle, message) {
  if (!String(text || '').includes(needle)) errors.push(message);
}

if (packageJson.scripts?.['check:result-import-workspace'] !== 'node scripts/check-result-import-workspace-contract.mjs') {
  errors.push('package.json must expose check:result-import-workspace');
}

requireIncludes(indexHtml, './src/result-import-workspace.css', 'index.html must load result import workspace CSS');
requireIncludes(indexHtml, './src/result-import-workspace.js', 'index.html must load result import workspace script');
requireIncludes(sw, './src/result-import-workspace.js', 'service worker must cache result import workspace script');
requireIncludes(sw, './src/result-import-workspace.css', 'service worker must cache result import workspace CSS');

requireIncludes(script, "const LAYOUT_LOCK = 'v5.9.6_LOCK'", 'result import must preserve v5.9.6_LOCK');
requireIncludes(script, "const STORAGE_KEY = 'pl-commentary-bank-db-v1'", 'result import must write to the same local workspace key');
requireIncludes(script, 'doNotInferAthleteHistory: true', 'result import must document no-inference policy');
requireIncludes(script, "history.status === '確認済' && !sourceId", 'confirmed imports must require a sourceId');
requireIncludes(script, 'localStorage.setItem(STORAGE_KEY', 'result import must apply only to local workspace storage');
requireIncludes(script, 'database.meta.imports', 'result import must append an import audit trail');
requireIncludes(script, '公式結果PDF/貼付取込', 'result import must distinguish pasted official-result sources');
requireIncludes(script, '未確認候補からは推測しません', 'UI must state that research candidates are not promoted by inference');
requireIncludes(css, '.result-import-workspace', 'CSS must scope result import workspace styles');

for (const forbidden of ['total-academy', 'Platform Buddy', 'platform-buddy']) {
  if (script.includes(forbidden) || indexHtml.includes(forbidden)) {
    errors.push(`result import workspace must not reference ${forbidden}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: result import workspace contract is protected');
