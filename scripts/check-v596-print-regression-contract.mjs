import fs from 'node:fs';

const errors = [];

const packageJson = readJson('package.json', 'package.json');
const eventConfig = readJson('data/event-config.json', 'data/event-config.json');
const database = readJson('data/database.json', 'data/database.json');
const appText = readText('src/app.js');
const styleText = readText('src/styles.css');
const indexText = readText('index.html');

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${label}: could not be read as JSON: ${error.message}`);
    return null;
  }
}

function readText(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file}: could not be read: ${error.message}`);
    return '';
  }
}

function requireIncludes(text, needle, target, message) {
  if (!text.includes(needle)) errors.push(`${target}: ${message}`);
}

function requireMatches(text, pattern, target, message) {
  if (!pattern.test(text)) errors.push(`${target}: ${message}`);
}

function requireCount(text, needle, expected, target, message) {
  const count = text.split(needle).length - 1;
  if (count !== expected) errors.push(`${target}: ${message}; found ${count}, expected ${expected}`);
}

if (packageJson) {
  if (packageJson.scripts?.['check:print-regression'] !== 'node scripts/check-v596-print-regression-contract.mjs') {
    errors.push('package.json must expose check:print-regression');
  }

  if (!String(packageJson.scripts?.validate || '').includes('node scripts/check-v596-print-regression-contract.mjs')) {
    errors.push('package.json validate must include the v5.9.6 print regression contract');
  }
}

if (database?.meta?.layoutTemplate !== 'v5.9.6_LOCK') {
  errors.push('data/database.json: meta.layoutTemplate must remain v5.9.6_LOCK');
}

if (eventConfig) {
  const printPolicy = eventConfig.printPolicy || {};
  if (printPolicy.layoutTemplate !== 'v5.9.6_LOCK') errors.push('data/event-config.json: printPolicy.layoutTemplate must remain v5.9.6_LOCK');
  if (printPolicy.paper !== 'A4') errors.push('data/event-config.json: printPolicy.paper must remain A4');
  if (printPolicy.orientation !== 'landscape') errors.push('data/event-config.json: printPolicy.orientation must remain landscape');
  if (printPolicy.allowLayoutChange !== false) errors.push('data/event-config.json: printPolicy.allowLayoutChange must remain false');
  if (printPolicy.sourcePlacement !== 'appendix') errors.push('data/event-config.json: sourcePlacement must remain appendix');
  if (!Number.isInteger(printPolicy.cardsPerPage) || printPolicy.cardsPerPage < 1 || printPolicy.cardsPerPage > 2) {
    errors.push('data/event-config.json: cardsPerPage must stay within the locked maximum of two athletes per A4 page');
  }
}

requireIncludes(indexText, '固定雛形：v5.9.6_LOCK', 'index.html', 'visible layout lock banner must remain');
requireIncludes(indexText, '<div id="pages"></div>', 'index.html', 'print output must stay isolated in the pages mount');

requireIncludes(
  appText,
  '<section class="a4"><header class="page-header">',
  'src/app.js',
  'athlete pages must continue to use the locked A4 page wrapper and header',
);
requireIncludes(
  appText,
  '${esc(p.group)}.Lot ${esc(p.lot)}&nbsp;&nbsp;${esc(p.name)} <span class="kana">${esc(p.kana)}</span>',
  'src/app.js',
  'athlete heading must remain group/Lot/name/furigana in one line',
);
requireIncludes(appText, '<section class="a4 sources">', 'src/app.js', 'source appendix must keep the A4 page wrapper');
requireIncludes(appText, '個別ページに確認元を置かず、巻末へ集約', 'src/app.js', 'source details must remain appendix-oriented');
requireIncludes(appText, "players.map(page).join('')+sourcePage()", 'src/app.js', 'rendered athlete pages must append exactly one source appendix');
requireCount(appText, '+sourcePage()', 1, 'src/app.js', 'source appendix must be appended exactly once');
requireIncludes(appText, "let printMode='single'", 'src/app.js', 'single-athlete print mode must remain the default');
requireIncludes(appText, "if(printMode==='selected')", 'src/app.js', 'explicit selected-athlete print mode must remain available');
requireIncludes(appText, "if(printMode==='all')", 'src/app.js', 'selected event all-athlete print mode must remain constrained by printPlayers');

requireMatches(styleText, /@page\s*\{[^}]*size:\s*A4\s+landscape;[^}]*margin:\s*0;?/s, 'src/styles.css', '@page must remain A4 landscape with zero margin');
requireMatches(styleText, /\.a4\s*\{[^}]*width:\s*297mm;[^}]*min-height:\s*210mm;[^}]*page-break-after:\s*always;?/s, 'src/styles.css', '.a4 must remain A4 landscape dimensions with page breaks');
requireMatches(styleText, /@media print[\s\S]*\.a4\s*\{[^}]*width:\s*297mm;[^}]*height:\s*210mm;[^}]*overflow:\s*hidden;?/s, 'src/styles.css', 'print CSS must keep fixed A4 landscape page boxes without overflow spill');
requireMatches(styleText, /\.title\s+\.kana\s*\{[^}]*margin-left:\s*8px;?/s, 'src/styles.css', 'furigana must stay immediately to the right of the athlete name');
requireMatches(styleText, /\.event-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\);?/s, 'src/styles.css', 'event history cards must keep the locked three-column grid');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: v5.9.6 print regression contract is protected');
