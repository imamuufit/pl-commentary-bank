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

function parseJson(file) {
  const text = read(file);
  try {
    return JSON.parse(text);
  } catch (error) {
    errors.push(`${file}: invalid JSON: ${error.message}`);
    return null;
  }
}

function requireIncludes(file, text, needle, message) {
  if (!text.includes(needle)) errors.push(`${file}: ${message}`);
}

function localReferenceIsPagesSafe(value) {
  if (!value) return true;
  if (/^(https?:|mailto:|tel:|#|data:|blob:)/.test(value)) return true;
  return value.startsWith('./') || value.startsWith('../');
}

function quotedRelativeReferences(text) {
  return [...text.matchAll(/['"](\.\.?\/(?:[^'"]*)?)['"]/g)].map(match => match[1]);
}

const indexHtml = read('index.html');
const sw = read('sw.js');
const manifest = parseJson('manifest.webmanifest');

requireIncludes('index.html', indexHtml, '<meta name="viewport" content="width=device-width, initial-scale=1">', 'viewport meta must remain present');
requireIncludes('index.html', indexHtml, '<meta name="theme-color"', 'theme-color meta must remain present for PWA install UI');
requireIncludes('index.html', indexHtml, '<link rel="manifest" href="./manifest.webmanifest">', 'manifest link must stay relative for project GitHub Pages');
requireIncludes('index.html', indexHtml, '<link rel="stylesheet" href="./src/styles.css">', 'stylesheet path must stay relative for project GitHub Pages');
requireIncludes('index.html', indexHtml, '<script type="module" src="./src/app.js"></script>', 'module script path must stay relative for project GitHub Pages');
requireIncludes('index.html', indexHtml, "navigator.serviceWorker.register('./sw.js')", 'service worker registration must stay relative for project GitHub Pages');

for (const match of indexHtml.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  const value = match[1];
  if (!localReferenceIsPagesSafe(value)) errors.push(`index.html: ${value} must be relative or external`);
}

if (manifest) {
  if (manifest.start_url !== './') errors.push('manifest.webmanifest: start_url must be ./ for project GitHub Pages');
  if (manifest.scope !== './') errors.push('manifest.webmanifest: scope must be ./ for project GitHub Pages');
  if (!localReferenceIsPagesSafe(manifest.start_url)) errors.push('manifest.webmanifest: start_url is not GitHub Pages-safe');
  if (!localReferenceIsPagesSafe(manifest.scope)) errors.push('manifest.webmanifest: scope is not GitHub Pages-safe');
  for (const icon of manifest.icons || []) {
    if (!localReferenceIsPagesSafe(icon.src)) errors.push(`manifest.webmanifest: icon ${icon.src} must be relative or external`);
  }
}

const assetMatches = quotedRelativeReferences(sw);
for (const required of ['./', './index.html', './manifest.webmanifest', './src/styles.css', './src/app.js', './data/database.json', './data/research-candidates.json', './data/event-config.json']) {
  if (!assetMatches.includes(required)) errors.push(`sw.js: ${required} must remain cached for GitHub Pages/offline fallback`);
}

for (const asset of assetMatches) {
  if (!localReferenceIsPagesSafe(asset)) errors.push(`sw.js: ${asset} must be relative for GitHub Pages`);
  if (asset.startsWith('/')) errors.push(`sw.js: ${asset} must not be root-relative on project GitHub Pages`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: GitHub Pages contract is relative-path safe');
