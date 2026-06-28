import fs from 'node:fs';

const errors = [];
const appText = readText('src/app.js');

function readText(file) {
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

requireIncludes("['sourceUrl','確認元URL']", 'history entry form must keep an explicit source URL field');
requireIncludes("sourceIds:[]", 'new history rows must initialize sourceIds separately');
requireIncludes("db.sources.push({id:sid,title:v,url:v,sourceType:'その他',checkedAt:nowDate(),memo:'PWAから追加'})", 'source URL entry must create an explicit source record');
requireIncludes('h.sourceIds=[sid]', 'newly created source record must be attached to the history row');
requireIncludes("history.status==='確認済'&&(!Array.isArray(history.sourceIds)||history.sourceIds.length===0)", 'confirmed histories must continue to fail validation without sourceIds');
requireIncludes("assertValidWorkspace(imported.database,imported.researchCandidates||researchDb,'JSON読込データ')", 'imported workspace must be validated before becoming local data');
requireIncludes("alert('JSON保存はPCへ保存するだけです。GitHub上の正本DBは自動更新されません。')", 'plain JSON export must continue warning that it does not update GitHub');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: history entry source contract is protected');
