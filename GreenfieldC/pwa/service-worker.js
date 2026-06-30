
const CACHE_NAME = 'pwa-demo-v1';
const ASSETS = [
  './',
  'index.html',
  'styles.css',
  'script.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() => caches.match('index.html'))
    )
  );
});

// Background Sync für Daten
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Simpler Sync: Hole Queue aus localStorage (über clients)
  const allClients = await self.clients.matchAll();
  for (const client of allClients) {
    client.postMessage({ action: 'sync-request' });
  }
}
