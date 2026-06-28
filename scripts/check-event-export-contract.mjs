import fs from 'node:fs';

const errors = [];
const appText = read('src/app.js');

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function requireIncludes(needle, message) {
  if (!appText.includes(needle)) errors.push(`src/app.js: ${message}`);
}

requireIncludes('function exportEventConfigJson()', 'event config JSON exporter must remain present');
requireIncludes("assertValidEventConfig(eventConfig,'大会設定')", 'event config export must validate before download');
requireIncludes('event-config-${nowDate()}.json', 'event config export filename must remain explicit and dated');
requireIncludes('id=\'eventConfigJsonBtn\'', 'event config export button must have a stable id');
requireIncludes("textContent='大会設定JSON保存'", 'event config export button label must remain visible');
requireIncludes('eventExport.onclick=exportEventConfigJson', 'event config export button must call the exporter');
requireIncludes('大会設定JSON保存は大会切替準備用の設定だけをPCへ保存します', 'data status must explain event config export scope');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: event config export contract is protected');
