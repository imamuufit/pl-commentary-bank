import fs from 'node:fs';

const errors = [];
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const indexHtml = fs.readFileSync('index.html', 'utf8');
const sw = fs.readFileSync('sw.js', 'utf8');
const picker = fs.readFileSync('src/official-source-candidate-picker.js', 'utf8');

function requireIncludes(text, needle, message) {
  if (!String(text || '').includes(needle)) errors.push(message);
}

if (packageJson.scripts?.['check:official-source-picker'] !== 'node scripts/check-official-source-picker-contract.mjs') {
  errors.push('package.json must expose check:official-source-picker');
}

requireIncludes(
  packageJson.scripts?.validate,
  'node scripts/check-official-source-picker-contract.mjs',
  'package.json validate must include the official source picker contract',
);

requireIncludes(indexHtml, './src/official-source-candidate-picker.js', 'index.html must load the official source candidate picker');
requireIncludes(sw, './src/official-source-candidate-picker.js', 'service worker must cache the official source candidate picker');
requireIncludes(sw, './data/event-source-candidates.json', 'service worker must cache the official source candidate index');

requireIncludes(
  picker,
  "const EVENT_SOURCE_CANDIDATES_URL = './data/event-source-candidates.json'",
  'picker must read the candidate-only event source index',
);
requireIncludes(picker, 'function linkedSources(event)', 'picker must normalize top-level and linked event sources');
requireIncludes(picker, 'event?.linkedSources || []', 'picker must include linked source locators');
requireIncludes(picker, 'candidateId: event.candidateId', 'picker source options must retain candidate id context');
requireIncludes(picker, 'eventName: event.eventName', 'picker source options must retain event name context');
requireIncludes(picker, "if (hasKind(source, 'resultPdf')) return 0", 'picker must prioritize official result PDFs first');
requireIncludes(picker, "if (hasKind(source, 'sokuhou')) return 1", 'picker must keep sokuhou below official result PDFs');
requireIncludes(picker, "if (hasKind(source, 'entryRoster')) return 2", 'picker must keep entry roster sources below result/sokuhou');
requireIncludes(picker, "if (hasKind(source, 'program')) return 3", 'picker must keep program sources below result/sokuhou/entry');
requireIncludes(
  picker,
  "['resultPdf', 'sokuhou', 'entryRoster', 'program'].some((kind) => hasKind(source, kind))",
  'picker must restrict import options to result, sokuhou, entry, and program locators',
);
requireIncludes(picker, "const titleInput = $('#resultImportSourceTitle')", 'picker must target the result import source title field');
requireIncludes(picker, "const urlInput = $('#resultImportSourceUrl')", 'picker must target the result import source URL field');
requireIncludes(picker, "titleInput.value = source?.title || ''", 'picker must fill source title without inference');
requireIncludes(picker, "urlInput.value = source?.url || ''", 'picker must fill source URL without inference');
requireIncludes(picker, "id=\"officialSourceCandidatePicker\"", 'picker must render a distinct official source picker control');
requireIncludes(picker, "id=\"officialSourceCandidateSelect\"", 'picker must render a distinct official source select control');

for (const forbidden of ['total-academy', 'Platform Buddy', 'platform-buddy', 'e1RM', 'RPE', 'Buddy Method']) {
  if (picker.includes(forbidden) || indexHtml.includes(forbidden)) {
    errors.push(`official source picker must not reference ${forbidden}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: official source picker contract is protected');
