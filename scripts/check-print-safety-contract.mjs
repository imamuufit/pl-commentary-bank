import fs from 'node:fs';

const errors = [];
const indexText = read('index.html');
const appText = read('src/app.js');

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

function requireAnyIncludes(text, needles, target, message) {
  if (!needles.some((needle) => text.includes(needle))) errors.push(`${target}: ${message}`);
}

requireIncludes(indexText, '<header class="top no-print">', 'index.html', 'top action header must remain screen-only');
requireIncludes(indexText, '<aside class="side no-print">', 'index.html', 'editor sidebar must remain screen-only');
requireIncludes(indexText, '<div class="no-print lock">固定雛形：v5.9.6_LOCK', 'index.html', 'layout lock banner must remain screen-only');
requireIncludes(indexText, '<div id="pages"></div>', 'index.html', 'print page mount must remain isolated');

requireAnyIncludes(appText, ["box.className='no-print data-status'", 'box.className="no-print data-status"'], 'src/app.js', 'data status panel must remain screen-only');
requireAnyIncludes(appText, ["panel.className='panel no-print candidate-panel'", 'panel.className="panel no-print candidate-panel"'], 'src/app.js', 'research candidate panel must remain screen-only');
requireIncludes(appText, "document.querySelector('.actions')?.insertBefore", 'src/app.js', 'runtime action buttons must stay in the non-print header');
requireIncludes(appText, "let printMode='single'", 'src/app.js', 'single-athlete print mode must remain the default');
requireIncludes(appText, 'const selectedPrintPlayerIds=new Set()', 'src/app.js', 'multi-athlete print selection must be explicit and user-controlled');
requireIncludes(appText, 'function printPlayers()', 'src/app.js', 'printed athletes must be selected through a single safe target function');
requireIncludes(appText, "if(printMode==='single')", 'src/app.js', 'single-athlete print target must remain supported');
requireIncludes(appText, "if(printMode==='selected')", 'src/app.js', 'multi-selected athlete print target must remain supported');
requireIncludes(appText, "if(printMode==='all')", 'src/app.js', 'selected-event all-athlete print target must remain supported');
requireIncludes(appText, "players.map(page).join('')+sourcePage()", 'src/app.js', 'printed output must reuse the existing athlete page template and append one source appendix');
requireIncludes(appText, 'function sourcePage()', 'src/app.js', 'appendix source page must remain present');
requireIncludes(appText, '個別ページに確認元を置かず、巻末へ集約', 'src/app.js', 'source placement must remain appendix-based');
requireIncludes(appText, '<section class="a4 sources">', 'src/app.js', 'source appendix must keep the A4 page container');
requireIncludes(appText, '<section class="a4">', 'src/app.js', 'athlete page template must keep the A4 page container');
requireIncludes(appText, 'print-target-controls', 'src/app.js', 'print target controls must remain no-print UI only');
requireIncludes(appText, '巻末_記録/確認元は最後に1回だけ付けます', 'src/app.js', 'UI must disclose that the appendix is appended once at the end');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: print safety contract is protected');
