import fs from 'node:fs';

const sw = fs.readFileSync('sw.js', 'utf8');
const errors = [];

const requiredSnippets = [
  "const CACHE_NAME = 'pl-commentary-bank-v0.1.3'",
  'if (!response || !response.ok) return response;',
  'caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))',
  'caches.match(withoutQuery(event.request))',
  "caches.match('./index.html')"
];

for (const snippet of requiredSnippets) {
  if (!sw.includes(snippet)) errors.push(`sw.js missing cache safety snippet: ${snippet}`);
}

const okGuardIndex = sw.indexOf('if (!response || !response.ok) return response;');
const cachePutIndex = sw.indexOf('cache.put(event.request, copy)');
if (okGuardIndex === -1 || cachePutIndex === -1 || okGuardIndex > cachePutIndex) {
  errors.push('service worker must check response.ok before writing to cache');
}

if (/cache\.put\(event\.request,\s*response/.test(sw)) {
  errors.push('service worker must cache a cloned response, not the live response object');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: service worker cache safety contract is protected');
