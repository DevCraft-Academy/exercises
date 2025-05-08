/**
 * Service Worker
 */

const CACHE_NAME = 'pwa-shell-v1';
const STATIC_ASSETS = [
  '/10_Performance_Optimierung/Tag_5_Superschnelle_Webapps/',
  '/10_Performance_Optimierung/Tag_5_Superschnelle_Webapps/index.html',
  '/10_Performance_Optimierung/Tag_5_Superschnelle_Webapps/style.css',
  '/10_Performance_Optimierung/Tag_5_Superschnelle_Webapps/app.js'
];

// Installation – cache static_assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// invalidation: delete old data from cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch-Handler - can event be fetched?
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request); // if yes return response
    }).catch(() => {
      return new Response('Offline – keine Daten verfügbar.', { // if no return offline message
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});

// Background Sync – synchronize messages that have been sent
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

// reads messages from chache and sends them to api if available
async function syncMessages() {
  const db = await openDB('pwa-db1', 1);
  const tx = db.transaction('messages', 'readonly');
  const store = tx.objectStore('messages');
  const allMessages = await store.getAll();

  await Promise.all(allMessages.map(msg => {
    return fetch('https://localhost:8123/api/send', {
      method: 'POST',
      body: JSON.stringify(msg),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }));

  // delete all local messages after successful submission
  const txDel = db.transaction('messages', 'readwrite');
  const storeDel = txDel.objectStore('messages');
  await storeDel.clear();
}
