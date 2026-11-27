/* Game4Gambia service worker – basic offline caching */
const CACHE = 'g4g-v1';
const BASE = self.registration.scope;
const PRECACHE = [BASE, `${BASE}index.html`, `${BASE}offline.html`, `${BASE}manifest.webmanifest`];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // Never cache API calls or authenticated responses.
  if (request.url.includes('/api/') || request.headers.get('Authorization')) {
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request)
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return response;
        })
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match(`${BASE}offline.html`);
          }
        });
    })
  );
});