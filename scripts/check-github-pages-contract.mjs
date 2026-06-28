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

function requireFile(file, owner) {
  if (!fs.existsSync(file)) errors.push(`${owner}: referenced file does not exist: ${file}`);
}

function requireRelative(url, owner) {
  if (url.startsWith('http://') || url.startsWith('https://')) errors.push(`${owner}: asset URL must be relative: ${url}`);
  if (url.startsWith('/')) errors.push(`${owner}: asset URL must not start with slash: ${url}`);
}

function assetPath(url) {
  return url.replace(/^\.\//, '').split('?')[0].split('#')[0];
}

const index = read('index.html');
const sw = read('sw.js');
const manifestText = read('manifest.webmanifest');

const requiredIndexUrls = [
  './manifest.webmanifest',
  './icons/icon.svg',
  './src/styles.css',
  './sw.js',
  './src/app.js'
];

for (const url of requiredIndexUrls) {
  if (!index.includes(url)) errors.push(`index.html: missing required relative asset ${url}`);
  requireRelative(url, 'index.html');
  requireFile(assetPath(url), 'index.html');
}

const requiredCachedUrls = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './src/styles.css',
  './src/app.js',
  './data/database.json',
  './data/research-candidates.json',
  './data/event-config.json'
];

for (const url of requiredCachedUrls) {
  if (!sw.includes(`'${url}'`)) errors.push(`sw.js: missing required cached URL ${url}`);
  requireRelative(url, 'sw.js');
  if (url !== './') requireFile(assetPath(url), 'sw.js');
}

if (!sw.includes("caches.match('./index.html')")) {
  errors.push('sw.js: offline fallback must remain ./index.html');
}

try {
  const manifest = JSON.parse(manifestText);
  if (manifest.start_url !== './') errors.push('manifest.webmanifest: start_url must be ./');
  if (manifest.scope !== './') errors.push('manifest.webmanifest: scope must be ./');
  for (const icon of manifest.icons || []) {
    requireRelative(icon.src || '', 'manifest.webmanifest');
    requireFile(assetPath(icon.src || ''), 'manifest.webmanifest');
  }
} catch (error) {
  errors.push(`manifest.webmanifest: invalid JSON: ${error.message}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: GitHub Pages relative asset contract is protected');
