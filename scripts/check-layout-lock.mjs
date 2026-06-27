import fs from 'node:fs';

const checks = [
  ['data/database.json', '"layoutTemplate": "v5.9.6_LOCK"', 'database meta.layoutTemplate must remain v5.9.6_LOCK'],
  ['index.html', '固定雛形：v5.9.6_LOCK', 'visible lock warning must remain in preview'],
  ['src/app.js', '<header class="page-header">', 'A4 page header markup must remain present'],
  ['src/app.js', '<section class="events"><h2>出場歴</h2><div class="event-grid">', 'event history card grid must remain present'],
  ['src/app.js', 'page(p)', 'page renderer must remain present'],
  ['src/app.js', 'sourcePage()', 'source appendix page must remain present']
];

const regexChecks = [
  ['src/styles.css', /@page\s*\{[^}]*size:\s*A4\s+landscape;[^}]*margin:\s*0;/s, '@page must remain A4 landscape with zero print margin'],
  ['src/styles.css', /\.a4\s*\{[^}]*width:\s*297mm;[^}]*min-height:\s*210mm;/s, '.a4 must remain A4 landscape dimensions'],
  ['src/styles.css', /\.event-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\);/s, 'event grid must stay two-column']
];

const cache = new Map();
const errors = [];

function read(file) {
  if (cache.has(file)) return cache.get(file);
  try {
    const text = fs.readFileSync(file, 'utf8');
    cache.set(file, text);
    return text;
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

for (const [file, needle, message] of checks) {
  if (!read(file).includes(needle)) errors.push(`${file}: ${message}`);
}

for (const [file, pattern, message] of regexChecks) {
  if (!pattern.test(read(file))) errors.push(`${file}: ${message}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: v5.9.6_LOCK print layout guard passed');
