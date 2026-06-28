import fs from 'node:fs';

const app = fs.readFileSync('src/app.js', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const cli = fs.readFileSync('scripts/export-player-roster.mjs', 'utf8');
const errors = [];

const requiredAppSnippets = [
  'function playerRosterCsv()',
  "['player_id','group','lot','name','kana','english_name','sex','bodyweight_class','team','entry_division','declared_best','history_count','confirmed_history_count','candidate_count']",
  'function exportPlayerRosterCsv()',
  "assertValidWorkspace(db,researchDb,'選手名簿CSV保存前データ')",
  'player-roster-${nowDate()}.csv',
  "playerRosterExport.id='playerRosterCsvBtn'",
  "playerRosterExport.textContent='選手名簿CSV保存'",
  'playerRosterExport.onclick=exportPlayerRosterCsv',
  '選手名簿CSV保存はLot順の選手一覧と履歴・候補件数の棚卸し用です。'
];

const requiredCliSnippets = [
  "exportType: 'player-roster'",
  'researchCandidateCount',
  'confirmedHistoryCount',
  "history.status === '確認済'",
  "candidate.status === '確認済'",
  'confirmed items must not remain in research-candidates',
  'unknown playerId',
  'layoutTemplate: database.meta?.layoutTemplate || null',
  "database meta.layoutTemplate must be v5.9.6_LOCK"
];

for (const snippet of requiredAppSnippets) {
  if (!app.includes(snippet)) errors.push(`src/app.js missing player roster export contract snippet: ${snippet}`);
}

for (const snippet of requiredCliSnippets) {
  if (!cli.includes(snippet)) errors.push(`scripts/export-player-roster.mjs missing player roster JSON contract snippet: ${snippet}`);
}

if (pkg.scripts?.['export:players'] !== 'node scripts/export-player-roster.mjs') {
  errors.push('package.json must expose npm run export:players');
}

if (pkg.scripts?.['check:player-roster-export'] !== 'node scripts/check-player-roster-export-contract.mjs') {
  errors.push('package.json must expose npm run check:player-roster-export');
}

if (!String(pkg.scripts?.validate || '').includes('node scripts/check-player-roster-export-contract.mjs')) {
  errors.push('npm run validate must include check-player-roster-export-contract.mjs');
}

const rosterExportIndex = app.indexOf("playerRosterExport.id='playerRosterCsvBtn'");
const dataStatusIndex = app.indexOf('選手名簿CSV保存はLot順の選手一覧と履歴・候補件数の棚卸し用です。');
const printFunctionIndex = app.indexOf('function page(p)');

if (rosterExportIndex === -1 || dataStatusIndex === -1) {
  errors.push('player roster export button and status explanation must both exist');
}

if (rosterExportIndex !== -1 && printFunctionIndex !== -1 && rosterExportIndex < printFunctionIndex) {
  errors.push('player roster export controls must remain non-print UI, not part of print card rendering');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: player roster CSV export and player roster JSON export contracts are protected');
