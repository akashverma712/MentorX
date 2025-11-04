const CACHE_NAME = 'myapp-static-v1';
const PRECACHE_URLS = [
  '/', 
  '/index.html',
  '/styles.css',       // if you have a built CSS file
  '/main.js'           // adjust to your build filenames or use wildcard strategy
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          // optionally cache new GET requests
          return response;
        })
        .catch(() => caches.match('/index.html')); // offline fallback
    })
  );
});
