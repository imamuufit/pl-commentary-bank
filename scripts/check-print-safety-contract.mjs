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

requireIncludes(appText, "box.className='no-print data-status'", 'src/app.js', 'data status panel must remain screen-only');
requireIncludes(appText, "panel.className='panel no-print candidate-panel'", 'src/app.js', 'research candidate panel must remain screen-only');
requireIncludes(appText, "document.querySelector('.actions')?.insertBefore", 'src/app.js', 'runtime action buttons must stay in the non-print header');
requireAnyIncludes(appText, ["$('#pages').innerHTML=page(p)+sourcePage()", "$('#pages').innerHTML=p?page(p)+sourcePage():landingPage()"], 'src/app.js', 'printed output must remain selected athlete plus appendix source page');
requireIncludes(appText, 'function sourcePage()', 'src/app.js', 'appendix source page must remain present');
requireIncludes(appText, '個別ページに確認元を置かず、巻末へ集約', 'src/app.js', 'source placement must remain appendix-based');
requireIncludes(appText, '<section class="a4 sources">', 'src/app.js', 'source appendix must keep the A4 page container');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: print safety contract is protected');
