import fs from 'node:fs';

const app = fs.readFileSync('src/app.js', 'utf8');
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
