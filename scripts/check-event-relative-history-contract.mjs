import fs from 'node:fs';

const errors = [];
const indexText = read('index.html');
const helperText = read('src/event-relative-history.js');

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

requireIncludes(indexText, '<script src="./src/event-relative-history.js" defer></script>', 'index.html', 'event-relative history helper must remain loaded after the app');
requireIncludes(helperText, "const FALLBACK_FLOW = '履歴不足", 'src/event-relative-history.js', 'must show 履歴不足 when two prior confirmed histories are unavailable');
requireIncludes(helperText, "configJson?.event?.dateFrom || configJson?.event?.dateTo", 'src/event-relative-history.js', 'must use selected event dateFrom/dateTo as the base date');
requireIncludes(helperText, "history.status === '確認済'", 'src/event-relative-history.js', 'must use only confirmed histories');
requireIncludes(helperText, 'Array.isArray(history.sourceIds) && history.sourceIds.length > 0', 'src/event-relative-history.js', 'confirmed histories must carry sourceIds before use');
requireIncludes(helperText, "String(history.date) < baseDate", 'src/event-relative-history.js', 'must exclude the selected event date and future histories');
requireIncludes(helperText, 'const pair = histories.slice(-2)', 'src/event-relative-history.js', 'must select exactly the latest two prior histories');
requireIncludes(helperText, "blocks['前々回→前回']", 'src/event-relative-history.js', 'must update the existing 前々回→前回 block without changing layout markup');
requireIncludes(helperText, "blocks['推移コメント']", 'src/event-relative-history.js', 'must keep progress output conservative in the existing block');
requireIncludes(helperText, '未確認候補からは推測しません', 'src/event-relative-history.js', 'must explicitly avoid inference from unverified candidates');
requireNotIncludes(helperText, 'research-candidates', 'src/event-relative-history.js', 'must not read research candidate data for event-relative display');
requireNotIncludes(helperText, 'researchDb', 'src/event-relative-history.js', 'must not depend on candidate workspace state');
requireNotIncludes(helperText, 'document.createElement', 'src/event-relative-history.js', 'must not create new print layout sections');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: event-relative history contract is protected');
