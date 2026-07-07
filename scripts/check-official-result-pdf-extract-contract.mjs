import fs from 'node:fs';

const errors = [];
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const script = fs.readFileSync('scripts/extract-official-result-pdf.mjs', 'utf8');
const workflow = fs.readFileSync('.github/workflows/extract-official-result-pdf.yml', 'utf8');

function requireIncludes(text, needle, message) {
  if (!String(text || '').includes(needle)) errors.push(message);
}

if (packageJson.scripts?.['extract:official-result-pdf'] !== 'node scripts/extract-official-result-pdf.mjs') {
  errors.push('package.json must expose extract:official-result-pdf');
}
if (packageJson.scripts?.['check:official-result-pdf-extract'] !== 'node scripts/check-official-result-pdf-extract-contract.mjs') {
  errors.push('package.json must expose check:official-result-pdf-extract');
}

requireIncludes(script, 'data/event-source-candidates.json', 'extractor must read the official source candidate index');
requireIncludes(script, 'data/database.json', 'extractor must match against the current player database');
requireIncludes(script, "const DEFAULT_CANDIDATE_ID = 'hpa-2026-06-numata-bench'", 'extractor must default to Numata 2026 bench for this phase');
requireIncludes(script, "const DEFAULT_SOURCE_KIND = 'resultPdf'", 'extractor must default to official resultPdf sources');
requireIncludes(script, "execFileSync('pdftotext'", 'extractor must use pdftotext for official PDF text extraction');
requireIncludes(script, 'pwa-result-import.csv', 'extractor must emit a PWA-compatible import CSV');
requireIncludes(script, 'official-result-import-audit.json', 'extractor must emit an audit JSON');
requireIncludes(script, 'artifact-only; do not write database.json automatically', 'extractor must not mutate canonical database.json automatically');
requireIncludes(script, 'human row-level confirmation required before PWA import', 'extractor must require row-level human confirmation');
requireIncludes(script, 'layoutTemplate', 'extractor audit must preserve layout template evidence');

requireIncludes(workflow, 'workflow_dispatch', 'workflow must be manual dispatch only');
requireIncludes(workflow, 'poppler-utils', 'workflow must install PDF text tools');
requireIncludes(workflow, 'scripts/extract-official-result-pdf.mjs', 'workflow must run the official PDF extractor');
requireIncludes(workflow, 'actions/upload-artifact@v4', 'workflow must upload generated import artifacts');
requireIncludes(workflow, 'contents: read', 'workflow must not request write permissions');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: official result PDF extraction contract is protected');
