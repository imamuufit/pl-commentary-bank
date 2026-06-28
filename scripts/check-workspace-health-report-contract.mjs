import fs from 'node:fs';

const app = fs.readFileSync('src/app.js', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const cli = fs.readFileSync('scripts/generate-workspace-health-report.mjs', 'utf8');
const errors = [];

const requiredSnippets = [
  'function workspaceHealthReport()',
  'function exportWorkspaceHealthReport()',
  "assertValidWorkspace(db,researchDb,'点検レポート保存前データ')",
  "assertValidEventConfig(eventConfig,'点検レポート保存前大会設定')",
  'workspace-health-report-${nowDate()}.json',
  'confirmedWithoutSources',
  'unknownSourceLinks',
  'unusedSources',
  'historiesByStatus',
  'candidatesByStatus',
  "healthExport.id='workspaceHealthReportBtn'",
  "healthExport.textContent='点検レポートJSON保存'",
  'healthExport.onclick=exportWorkspaceHealthReport',
  '点検レポートJSON保存は正本DB・確認元・未確認候補の整合性確認用です。'
];

for (const snippet of requiredSnippets) {
  if (!app.includes(snippet)) errors.push(`src/app.js missing workspace health report snippet: ${snippet}`);
}

const requiredCliSnippets = [
  "readJson('data/database.json')",
  "readJson('data/research-candidates.json')",
  "readJson('data/event-config.json')",
  'confirmedWithoutSources',
  'unknownSourceLinks',
  'confirmedCandidatesStillInResearch',
  'candidatesForMissingPlayers',
  'blockingIssues',
  "database.meta?.layoutTemplate === 'v5.9.6_LOCK'",
  "eventConfig.printPolicy?.layoutTemplate === 'v5.9.6_LOCK'",
  'eventConfig.printPolicy?.allowLayoutChange === false',
  'process.exitCode = 1'
];

for (const snippet of requiredCliSnippets) {
  if (!cli.includes(snippet)) errors.push(`workspace health report CLI missing snippet: ${snippet}`);
}

if (pkg.scripts?.['health:report'] !== 'node scripts/generate-workspace-health-report.mjs') {
  errors.push('package.json must expose health:report command');
}

const healthExportIndex = app.indexOf("healthExport.id='workspaceHealthReportBtn'");
const printFunctionIndex = app.indexOf('function page(p)');
const candidatePanelIndex = app.indexOf('function ensureResearchPanel()');

if (healthExportIndex === -1) {
  errors.push('workspace health report export button must exist');
}

if (healthExportIndex !== -1 && printFunctionIndex !== -1 && healthExportIndex < printFunctionIndex) {
  errors.push('workspace health report export must remain non-print UI, not part of print rendering');
}

if (healthExportIndex !== -1 && candidatePanelIndex !== -1 && healthExportIndex > candidatePanelIndex) {
  errors.push('workspace health report export should stay with non-print safety controls');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: workspace health report contract is protected');
