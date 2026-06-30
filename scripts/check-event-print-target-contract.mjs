import fs from 'node:fs';

const errors = [];
const appText = read('src/app.js');
const helperText = read('src/event-relative-history.js');
const eventConfigText = read('data/event-config.json');

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

function requireCount(text, needle, expected, target, message) {
  const count = text.split(needle).length - 1;
  if (count !== expected) errors.push(`${target}: ${message}; found ${count}, expected ${expected}`);
}

let eventConfig = null;
try {
  eventConfig = JSON.parse(eventConfigText);
} catch (error) {
  errors.push(`data/event-config.json could not be parsed: ${error.message}`);
}

if (eventConfig) {
  if (eventConfig.printPolicy?.layoutTemplate !== 'v5.9.6_LOCK') errors.push('data/event-config.json: printPolicy.layoutTemplate must be v5.9.6_LOCK');
  if (eventConfig.printPolicy?.paper !== 'A4') errors.push('data/event-config.json: printPolicy.paper must be A4');
  if (eventConfig.printPolicy?.orientation !== 'landscape') errors.push('data/event-config.json: printPolicy.orientation must be landscape');
  if (eventConfig.printPolicy?.sourcePlacement !== 'appendix') errors.push('data/event-config.json: source appendix must remain appendix placement');
  if (eventConfig.printPolicy?.allowLayoutChange !== false) errors.push('data/event-config.json: allowLayoutChange must remain false');
  if (eventConfig.dataPolicy?.researchCandidatesStaySeparate !== true) errors.push('data/event-config.json: research candidates must stay separate');
  if (eventConfig.dataPolicy?.doNotPromoteCandidatesAutomatically !== true) errors.push('data/event-config.json: candidates must not be promoted automatically');
  if (eventConfig.dataPolicy?.doNotInferAthleteHistory !== true) errors.push('data/event-config.json: histories must not be inferred');
}

requireIncludes(appText, "let printMode='single'", 'src/app.js', 'single-athlete mode must be the default print target');
requireIncludes(appText, 'const selectedPrintPlayerIds=new Set()', 'src/app.js', 'multi-athlete print mode must be explicit and user-selected');
requireIncludes(appText, 'function eventEntryPlayers()', 'src/app.js', 'selected-event all-athlete mode must go through the event entry helper');
requireIncludes(appText, 'function printPlayers()', 'src/app.js', 'print targets must be centralized in printPlayers');
requireIncludes(appText, "if(printMode==='single')", 'src/app.js', 'single selected athlete print mode must remain supported');
requireIncludes(appText, "if(printMode==='selected')", 'src/app.js', 'multiple selected athlete print mode must remain supported');
requireIncludes(appText, "if(printMode==='all')", 'src/app.js', 'selected event all-athlete print mode must remain supported');
requireIncludes(appText, 'selectedPrintPlayerIds.has(p.id)', 'src/app.js', 'multi-athlete mode must use the explicit selected id set');
requireIncludes(appText, 'eventEntryPlayers().filter', 'src/app.js', 'selected/all print modes must be constrained to selected event entries');
requireIncludes(appText, 'players.map(page).join(\'\')+sourcePage()', 'src/app.js', 'selected print set must append exactly one source appendix after athlete pages');
requireCount(appText, '+sourcePage()', 1, 'src/app.js', 'source appendix must only be appended by renderPages once');
requireIncludes(appText, 'print-target-controls', 'src/app.js', 'print target controls must remain screen-only controls');
requireIncludes(appText, 'no-print print-target-controls', 'src/app.js', 'print target controls must not appear in printed PDF');
requireIncludes(appText, '巻末_記録/確認元は最後に1回だけ付けます', 'src/app.js', 'screen UI must disclose one-time appendix behavior');
requireIncludes(appText, '<section class="a4">', 'src/app.js', 'athlete page template must remain the existing A4 section');
requireIncludes(appText, '<section class="a4 sources">', 'src/app.js', 'source appendix must remain the existing A4 source page');

requireIncludes(helperText, "const FALLBACK_FLOW = '履歴不足", 'src/event-relative-history.js', 'fewer than two confirmed prior histories must display 履歴不足');
requireIncludes(helperText, "String(history?.status || '').trim() === '確認済'", 'src/event-relative-history.js', 'confirmed histories must require normalized 確認済 status');
requireIncludes(helperText, 'Array.isArray(history?.sourceIds) && history.sourceIds.some', 'src/event-relative-history.js', 'confirmed histories must require nonblank sourceIds');
requireIncludes(helperText, "String(history?.competitionName || '').trim().length > 0", 'src/event-relative-history.js', 'confirmed histories must require competition identity');
requireIncludes(helperText, '.filter((history) => isValidDateString(history.date))', 'src/event-relative-history.js', 'confirmed histories must require valid YYYY-MM-DD dates');
requireIncludes(helperText, "String(history.date) < baseDate", 'src/event-relative-history.js', 'event-relative selection must only use histories before the selected event');
requireIncludes(helperText, 'const pair = histories.slice(-2)', 'src/event-relative-history.js', 'previous two competitions must be selected as the latest two prior confirmed histories');
requireIncludes(helperText, '未確認候補からは推測しません', 'src/event-relative-history.js', 'candidate data must not generate assertive progress comments');
requireNotIncludes(helperText, 'research-candidates', 'src/event-relative-history.js', 'event-relative history helper must not read candidate data');
requireNotIncludes(helperText, 'document.createElement', 'src/event-relative-history.js', 'event-relative helper must not create print layout sections');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: event-relative print target contract is protected');
