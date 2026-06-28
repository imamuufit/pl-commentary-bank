import fs from 'node:fs';

const sw = fs.readFileSync('sw.js', 'utf8');
const errors = [];

const requiredSnippets = [
  "const CACHE_NAME = 'pl-commentary-bank-v0.1.2'",
  'function withoutQuery(request)',
  "url.search = ''",
  "url.hash = ''",
  "new Request(url.href, { method: 'GET' })",
  'caches.match(withoutQuery(event.request))',
  "caches.match('./index.html')"
];

for (const snippet of requiredSnippets) {
  if (!sw.includes(snippet)) errors.push(`sw.js missing required snippet: ${snippet}`);
}

const queryFallbackIndex = sw.indexOf('caches.match(withoutQuery(event.request))');
const htmlFallbackIndex = sw.indexOf("caches.match('./index.html')");

if (queryFallbackIndex === -1 || htmlFallbackIndex === -1 || queryFallbackIndex > htmlFallbackIndex) {
  errors.push('sw.js must try query-free cached data before index.html');
}

for (const url of ['./data/database.json', './data/research-candidates.json', './data/event-config.json']) {
  if (!sw.includes(`'${url}'`)) errors.push(`sw.js must precache ${url}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: service worker query-string fallback is protected');
