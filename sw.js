const CACHE_NAME = 'pl-commentary-bank-v0.1.2';
const ASSETS = [
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

function withoutQuery(request) {
  const url = new URL(request.url);
  url.search = '';
  url.hash = '';
  return new Request(url.href, { method: 'GET' });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request)
        .then(cached => cached || caches.match(withoutQuery(event.request)))
        .then(cached => cached || caches.match('./index.html')))
  );
});
