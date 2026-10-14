import fs from 'node:fs';
import path from 'node:path';

const errors = [];
const boundaryRule = 'PL Commentary Bank data, reports, event-index files, athlete data, and print-layout work must not target Platform Buddy / total-academy.';
const forbiddenMarkers = [
  ['total-academy', 'Platform Buddy repository name'],
  ['platform buddy', 'Platform Buddy app name'],
  ['platform-buddy', 'Platform Buddy path/key marker'],
  ['buddy method', 'Platform Buddy training method marker'],
  ['e1rm', 'Platform Buddy estimated max marker']
];

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    errors.push(`${file} could not be read: ${error.message}`);
    return '';
  }
}

function parseJson(file) {
  const text = read(file);
  try {
    return JSON.parse(text);
  } catch (error) {
    errors.push(`${file}: invalid JSON: ${error.message}`);
    return null;
  }
}

function walkFiles(root) {
  if (!fs.existsSync(root)) return [];
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(fullPath));
    if (entry.isFile()) files.push(fullPath);
  }

  return files;
}

function assertPathStaysInThisRepository(file) {
  const normalized = file.replace(/\\/g, '/').toLowerCase();
  for (const [marker, label] of forbiddenMarkers) {
    if (normalized.includes(marker)) {
      errors.push(`${file}: path contains ${label} marker "${marker}". ${boundaryRule}`);
    }
  }
}

function checkNoForbiddenMarkers(file) {
  const text = read(file).toLowerCase();
  for (const [marker, label] of forbiddenMarkers) {
    if (text.includes(marker)) {
      errors.push(`${file}: contains ${label} marker "${marker}". ${boundaryRule}`);
    }
  }
}

const packageJson = parseJson('package.json');
if (packageJson && packageJson.name !== 'pl-commentary-bank') {
  errors.push('package.json: package name must remain pl-commentary-bank');
}

const manifest = parseJson('manifest.webmanifest');
if (manifest && manifest.name !== 'PL Commentary Bank') {
  errors.push('manifest.webmanifest: app name must remain PL Commentary Bank');
}

const configFiles = [
  'package.json',
  'manifest.webmanifest',
  'index.html',
  'sw.js',
  ...walkFiles(path.join('.github', 'workflows')).filter(file => /\.(ya?ml)$/i.test(file))
];

const appRuntimeFiles = [
  ...walkFiles('src').filter(file => /\.(css|html|js|mjs)$/i.test(file)),
  ...walkFiles('icons').filter(file => /\.(svg|json|webmanifest)$/i.test(file))
];

const repositoryFiles = walkFiles('.').filter(file => {
  const normalized = file.replace(/\\/g, '/');
  return !normalized.startsWith('.git/')
    && !normalized.startsWith('node_modules/');
});

for (const file of repositoryFiles) {
  assertPathStaysInThisRepository(file);
}

for (const file of configFiles) {
  checkNoForbiddenMarkers(file);
}

for (const file of appRuntimeFiles) {
  checkNoForbiddenMarkers(file);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: repository boundary smoke check passed');
