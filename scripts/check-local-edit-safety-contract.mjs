import fs from 'node:fs';

const app = fs.readFileSync('src/app.js', 'utf8');
const errors = [];

function requireIncludes(snippet, message) {
  if (!app.includes(snippet)) errors.push(`src/app.js: ${message}`);
}

function requireFunctionHas(functionName, snippets) {
  const start = app.indexOf(`async function ${functionName}()`);
  if (start === -1) {
    errors.push(`src/app.js: ${functionName} must exist`);
    return;
  }
  const next = app.indexOf('\nasync function ', start + 1);
  const nextPlain = app.indexOf('\nfunction ', start + 1);
  const candidates = [next, nextPlain].filter(index => index !== -1);
  const end = candidates.length ? Math.min(...candidates) : app.length;
  const body = app.slice(start, end);
  for (const [snippet, message] of snippets) {
    if (!body.includes(snippet)) errors.push(`src/app.js: ${functionName} ${message}`);
  }
}

requireIncludes("const STORAGE_KEY='pl-commentary-bank-db-v1';", 'must keep the local workspace storage key stable');
requireIncludes("const WORKSPACE_BACKUP_VERSION='0.1.1';", 'must keep backup version explicit for import/export compatibility');
requireIncludes("function workspaceBackup()", 'must retain full workspace backup export');
requireIncludes("database:db,researchCandidates:researchDb,eventConfig", 'workspace backup must include database, research candidates, and event config together');
requireIncludes("JSON保存はPCへ保存するだけです。GitHub上の正本DBは自動更新されません。", 'manual JSON save must continue to disclose that GitHub main data is not updated automatically');

requireFunctionHas('reloadRemote', [
  ["if(!confirm('GitHub Pages上の正本DBを再読込します。ブラウザ内のローカル編集は上書きされます。続けますか？'))return;", 'must confirm before replacing local edits with remote data'],
  ['fetchRemoteDb()', 'must reload the canonical remote database'],
  ["localStorage.setItem(STORAGE_KEY,JSON.stringify(db,null,2));", 'must persist the reloaded canonical database locally']
]);

requireFunctionHas('discardLocal', [
  ["if(!confirm('ブラウザ内のローカル編集を破棄し、正本DBを読み直します。続けますか？'))return;", 'must confirm before discarding local edits'],
  ['localStorage.removeItem(STORAGE_KEY)', 'must explicitly clear the local edit store'],
  ['fetchRemoteDb()', 'must reload the canonical remote database after discard']
]);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: local edit safety contract is protected');
