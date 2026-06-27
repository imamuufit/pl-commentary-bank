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

function requireIncludes(file, needle, message) {
  const text = read(file);
  if (!text.includes(needle)) errors.push(`${file}: ${message}`);
}

requireIncludes('index.html', '<link rel="manifest" href="./manifest.webmanifest">', 'manifest link must remain present');
requireIncludes('index.html', "navigator.serviceWorker.register('./sw.js')", 'service worker registration must remain present');
requireIncludes('sw.js', './data/database.json', 'service worker must cache the confirmed database');
requireIncludes('sw.js', './data/research-candidates.json', 'service worker must cache research candidates separately');

const manifestText = read('manifest.webmanifest');
try {
  const manifest = JSON.parse(manifestText);
  if (manifest.name !== 'PL Commentary Bank') errors.push('manifest.webmanifest: name must be PL Commentary Bank');
  if (manifest.start_url !== './') errors.push('manifest.webmanifest: start_url must stay relative for GitHub Pages');
  if (manifest.scope !== './') errors.push('manifest.webmanifest: scope must stay relative for GitHub Pages');
  if (manifest.display !== 'standalone') errors.push('manifest.webmanifest: display must be standalone');
  if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) errors.push('manifest.webmanifest: at least one icon is required');
} catch (error) {
  errors.push(`manifest.webmanifest: invalid JSON: ${error.message}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: PWA assets are present and GitHub Pages-safe');
