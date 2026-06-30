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
requireIncludes(helperText, 'function isValidDateString(value)', 'src/event-relative-history.js', 'must validate event and history dates with a shared strict date guard');
requireIncludes(helperText, "date.toISOString().slice(0, 10) === text", 'src/event-relative-history.js', 'must reject impossible YYYY-MM-DD dates such as 2026-02-30');
requireIncludes(helperText, "configJson?.event?.dateFrom || configJson?.event?.dateTo || configJson?.event?.date", 'src/event-relative-history.js', 'must use selected event dateFrom/dateTo/date as the base date');
requireIncludes(helperText, 'return isValidDateString(date) ? date : null', 'src/event-relative-history.js', 'must reject invalid selected event dates');
requireIncludes(helperText, 'function hasConfirmedStatus(history)', 'src/event-relative-history.js', 'confirmed history status must be normalized before use');
requireIncludes(helperText, "String(history?.status || '').trim() === '確認済'", 'src/event-relative-history.js', 'confirmed history status must tolerate surrounding whitespace without broadening beyond 確認済');
requireIncludes(helperText, '.filter((history) => hasConfirmedStatus(history))', 'src/event-relative-history.js', 'must use only normalized confirmed histories');
requireIncludes(helperText, 'function hasConfirmedSourceIds(history)', 'src/event-relative-history.js', 'confirmed histories must validate sourceIds before use');
requireIncludes(helperText, 'Array.isArray(history?.sourceIds) && history.sourceIds.some', 'src/event-relative-history.js', 'confirmed histories must carry nonblank sourceIds before use');
requireIncludes(helperText, "String(sourceId || '').trim().length > 0", 'src/event-relative-history.js', 'blank sourceIds must not qualify as confirmed sources');
requireIncludes(helperText, 'function firstConfirmedSourceId(history)', 'src/event-relative-history.js', 'stable sorting must use the first nonblank confirmed source id');
requireIncludes(helperText, "String(firstConfirmedSourceId(history))", 'src/event-relative-history.js', 'same-date ordering must not be destabilized by blank leading sourceIds');
requireIncludes(helperText, '.filter((history) => hasConfirmedSourceIds(history))', 'src/event-relative-history.js', 'must exclude histories with empty sourceIds before selecting previous two events');
requireIncludes(helperText, 'function hasConfirmedCompetitionIdentity(history)', 'src/event-relative-history.js', 'confirmed histories must have an explicit competition identity before use');
requireIncludes(helperText, "String(history?.competitionName || '').trim().length > 0", 'src/event-relative-history.js', 'event-relative histories must not treat unnamed date-only records as competitions');
requireIncludes(helperText, '.filter((history) => hasConfirmedCompetitionIdentity(history))', 'src/event-relative-history.js', 'must exclude confirmed histories without a competition name before selecting previous two events');
requireIncludes(helperText, '.filter((history) => isValidDateString(history.date))', 'src/event-relative-history.js', 'must exclude impossible or malformed history dates before selecting previous two events');
requireIncludes(helperText, "String(history.date) < baseDate", 'src/event-relative-history.js', 'must exclude the selected event date and future histories');
requireIncludes(helperText, 'function historySortKey(history)', 'src/event-relative-history.js', 'must keep same-date confirmed histories in deterministic order');
requireIncludes(helperText, "String(history?.competitionName || '').trim()", 'src/event-relative-history.js', 'same-date ordering must use trimmed competition names');
requireIncludes(helperText, 'historySortKey(a).localeCompare(historySortKey(b))', 'src/event-relative-history.js', 'confirmed history sorting must use the stable sort key');
requireIncludes(helperText, 'const pair = histories.slice(-2)', 'src/event-relative-history.js', 'must select exactly the latest two prior histories');
requireIncludes(helperText, "blocks['前々回→前回']", 'src/event-relative-history.js', 'must update the existing 前々回→前回 block without changing layout markup');
requireIncludes(helperText, "blocks['推移コメント']", 'src/event-relative-history.js', 'must keep progress output conservative in the existing block');
requireIncludes(helperText, '未確認候補からは推測しません', 'src/event-relative-history.js', 'must explicitly avoid inference from unverified candidates');
requireIncludes(helperText, 'これは評価コメントではありません', 'src/event-relative-history.js', 'progress text must remain a neutral numeric supplement, not an assertive coaching or story comment');
requireIncludes(helperText, '機械的な数値差分・伸び率', 'src/event-relative-history.js', 'progress wording must describe confirmed numeric deltas as mechanical supplements');
requireIncludes(helperText, 'function athletePages()', 'src/event-relative-history.js', 'must process every athlete print page, not only the first page');
requireIncludes(helperText, 'pages.forEach((page) => applyPageRelativeHistory(page, database, baseDate))', 'src/event-relative-history.js', 'must apply relative histories page-by-page');
requireIncludes(helperText, 'function infoBlocks(page)', 'src/event-relative-history.js', 'must scope info block updates to each athlete page');
requireIncludes(helperText, 'function playerFromPage(database, page)', 'src/event-relative-history.js', 'must resolve the athlete for each page before applying event-relative history');
requireIncludes(helperText, "title.match(/^\\s*([A-Z])\\.Lot\\s*\\d+/)?.[1]", 'src/event-relative-history.js', 'must read the fixed-layout group letter from the page header');
requireIncludes(helperText, 'if (group && String(player.group) !== group) return false', 'src/event-relative-history.js', 'must avoid matching same-lot athletes from another group');
requireIncludes(helperText, 'function confirmedProgress(pair)', 'src/event-relative-history.js', 'must keep confirmed numeric progress generation isolated');
requireIncludes(helperText, "deltaLine('SQ', previousPrevious.sqBest, previous.sqBest)", 'src/event-relative-history.js', 'must only compare confirmed SQ values from the selected two histories');
requireIncludes(helperText, "deltaLine('BP', previousPrevious.bpBest, previous.bpBest)", 'src/event-relative-history.js', 'must only compare confirmed BP values from the selected two histories');
requireIncludes(helperText, "deltaLine('DL', previousPrevious.dlBest, previous.dlBest)", 'src/event-relative-history.js', 'must only compare confirmed DL values from the selected two histories');
requireIncludes(helperText, "deltaLine('T', previousPrevious.total, previous.total)", 'src/event-relative-history.js', 'must only compare confirmed total values from the selected two histories');
requireIncludes(helperText, '数値が揃った種目のみ表示しています', 'src/event-relative-history.js', 'must avoid filling missing numeric deltas by inference');
requireIncludes(helperText, 'function progressRate(before, after)', 'src/event-relative-history.js', 'must isolate percentage progress calculation');
requireIncludes(helperText, 'before <= 0', 'src/event-relative-history.js', 'must not calculate progress rate from invalid or zero baseline values');
requireIncludes(helperText, '数値差分・伸び率', 'src/event-relative-history.js', 'must display progress rates only as confirmed numeric supplements');
requireNotIncludes(helperText, 'research-candidates', 'src/event-relative-history.js', 'must not read research candidate data for event-relative display');
requireNotIncludes(helperText, 'researchDb', 'src/event-relative-history.js', 'must not depend on candidate workspace state');
requireNotIncludes(helperText, 'document.createElement', 'src/event-relative-history.js', 'must not create new print layout sections');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: event-relative history contract is protected');
