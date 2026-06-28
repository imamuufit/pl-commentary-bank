import fs from 'node:fs';

const app = fs.readFileSync('src/app.js', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const cli = fs.readFileSync('scripts/export-source-registry.mjs', 'utf8');
const errors = [];

const requiredAppSnippets = [
  'function sourceCsv()',
  "['source_id','title','url','source_type','checked_at','memo','linked_history_count']",
  'function exportSourceCsv()',
  "assertValidWorkspace(db,researchDb,'確認元CSV保存前データ')",
  'source-registry-${nowDate()}.csv',
  "sourceExport.id='sourceCsvBtn'",
  "sourceExport.textContent='確認元CSV保存'",
  'sourceExport.onclick=exportSourceCsv',
  '確認元CSV保存は巻末確認元の点検用です。'
];

const requiredCliSnippets = [
  "exportType: 'source-registry'",
  'linkedHistoryCount',
  'linkedHistories',
  "history.status === '確認済'",
  'confirmed history must have sourceIds',
  'unknown sourceId',
  'layoutTemplate: database.meta?.layoutTemplate || null',
  "database meta.layoutTemplate must be v5.9.6_LOCK"
];

for (const snippet of requiredAppSnippets) {
  if (!app.includes(snippet)) errors.push(`src/app.js missing source export contract snippet: ${snippet}`);
}

for (const snippet of requiredCliSnippets) {
  if (!cli.includes(snippet)) errors.push(`scripts/export-source-registry.mjs missing source registry JSON contract snippet: ${snippet}`);
}

if (pkg.scripts?.['export:sources'] !== 'node scripts/export-source-registry.mjs') {
  errors.push('package.json must expose npm run export:sources');
}

const sourceExportIndex = app.indexOf("sourceExport.id='sourceCsvBtn'");
const dataStatusIndex = app.indexOf('確認元CSV保存は巻末確認元の点検用です。');
const printFunctionIndex = app.indexOf('function page(p)');

if (sourceExportIndex === -1 || dataStatusIndex === -1) {
  errors.push('source export button and status explanation must both exist');
}

if (sourceExportIndex !== -1 && printFunctionIndex !== -1 && sourceExportIndex < printFunctionIndex) {
  errors.push('source export controls must remain non-print UI, not part of print card rendering');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: source CSV export and source registry JSON export contracts are protected');
