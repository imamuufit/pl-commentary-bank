import fs from 'node:fs';

const errors = [];
const appText = readText('src/app.js');
const candidates = readJson('data/research-candidates.json', 'research candidates');

function readText(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${label} could not be read: ${error.message}`);
    return null;
  }
}

function requireIncludes(needle, message) {
  if (!appText.includes(needle)) errors.push(`src/app.js: ${message}`);
}

requireIncludes("const CANDIDATES_URL='./data/research-candidates.json'", 'research candidates JSON must remain a separate data source');
requireIncludes('function fetchResearchDb()', 'research candidates must be fetched through a dedicated loader');
requireIncludes('function renderCandidates()', 'research candidates panel must remain present');
requireIncludes('function exportResearchCsv()', 'research candidates CSV export must remain present');
requireIncludes("id='researchCsvBtn'", 'research candidates export button must have a stable id');
requireIncludes("textContent='候補CSV保存'", 'research candidates export button label must remain visible');
requireIncludes('researchExport.onclick=exportResearchCsv', 'research candidates export button must call the CSV exporter');
requireIncludes('confirmed items must be promoted to database.json or downgraded from research-candidates', 'confirmed candidates must stay out of research-candidates');
requireIncludes('if(imported.researchCandidates)researchDb=imported.researchCandidates', 'workspace import must restore research candidates separately');

if (candidates) {
  if (!candidates.meta) errors.push('research-candidates.json: meta is required');
  if (!Array.isArray(candidates.candidates)) errors.push('research-candidates.json: candidates must be array');

  const ids = new Set();
  for (const candidate of candidates.candidates || []) {
    if (!candidate.candidateId) errors.push('candidate missing candidateId');
    if (candidate.candidateId && ids.has(candidate.candidateId)) errors.push(`duplicate candidate ${candidate.candidateId}`);
    if (candidate.candidateId) ids.add(candidate.candidateId);
    if (!candidate.playerId) errors.push(`${candidate.candidateId || 'unknown candidate'} missing playerId`);
    if (!candidate.playerName) errors.push(`${candidate.candidateId || 'unknown candidate'} missing playerName`);
    if (!candidate.note) errors.push(`${candidate.candidateId || 'unknown candidate'} missing note`);
    if (candidate.status === '確認済') errors.push(`${candidate.candidateId}: confirmed candidates must not remain in research-candidates.json`);
    if (!Array.isArray(candidate.searchTerms) || candidate.searchTerms.length === 0) errors.push(`${candidate.candidateId}: searchTerms must be a non-empty array`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: research candidates workflow contract is protected');
