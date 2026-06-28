import fs from 'node:fs';

const errors = [];

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function requireIncludes(file, text, needle, message) {
  if (!text.includes(needle)) errors.push(`${file}: ${message}`);
}

const app = read('src/app.js');

requireIncludes(
  'src/app.js',
  app,
  "function collectDataErrors(database,candidatesDb={candidates:[]})",
  'browser-side data validation must remain present'
);

requireIncludes(
  'src/app.js',
  app,
  "confirmed history must have sourceIds",
  'confirmed histories must keep the sourceIds requirement'
);

requireIncludes(
  'src/app.js',
  app,
  "confirmed items must be promoted to database.json or downgraded from research-candidates",
  'confirmed research candidates must not stay in the candidate pool'
);

requireIncludes(
  'src/app.js',
  app,
  "assertValidWorkspace(imported.database,imported.researchCandidates||researchDb,'JSON読込データ')",
  'JSON import must run the same workspace safety validation before saving'
);

requireIncludes(
  'src/app.js',
  app,
  "assertValidEventConfig(imported.eventConfig,'バックアップ内の大会設定')",
  'backup import must validate event config before accepting it'
);

requireIncludes(
  'src/app.js',
  app,
  "localStorage.removeItem(STORAGE_KEY);db=await fetchRemoteDb();dataOrigin='remote';",
  'broken local storage must fall back to the remote source database'
);

requireIncludes(
  'src/app.js',
  app,
  "JSON読込時も正本DBと同等の安全検証を行います",
  'UI must continue to disclose that imported JSON is safety-checked'
);

requireIncludes(
  'src/app.js',
  app,
  "sourceUrl",
  'history input must retain a confirmation-source URL field'
);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: UI safety contract is protected');
