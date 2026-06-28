import fs from 'node:fs';

const appText = fs.readFileSync('src/app.js', 'utf8');
const errors = [];

function mustContain(needle, message) {
  if (!appText.includes(needle)) errors.push(`src/app.js: ${message}`);
}

mustContain('function exportResearchJson()', 'missing research JSON exporter');
mustContain('assertValidWorkspace(db,researchDb', 'research JSON exporter must validate before download');
mustContain('research-candidates-${nowDate()}.json', 'research JSON filename must be dated and explicit');
mustContain('JSON.stringify(researchDb,null,2)', 'research JSON export must save only researchDb');
mustContain("id='researchJsonBtn'", 'research JSON button must have stable id');
mustContain("textContent='候補JSON保存'", 'research JSON button label must remain visible');
mustContain('researchJsonExport.onclick=exportResearchJson', 'research JSON button must call exporter');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: research candidates JSON export contract is protected');
