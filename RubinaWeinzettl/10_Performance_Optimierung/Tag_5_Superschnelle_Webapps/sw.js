const CACHE_NAME = 'pwa-shell-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js'
];

// Installation – statische Dateien cachen
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Aktivierung – veraltete Caches löschen
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

// Fetch-Handler – Offline-Unterstützung
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return new Response('Offline – keine Daten verfügbar.', {
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});

// Background Sync – synchronisiere gesendete Nachrichten
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  const db = await openDB('pwa-db', 1);
  const tx = db.transaction('messages', 'readonly');
  const store = tx.objectStore('messages');
  const allMessages = await store.getAll();

  await Promise.all(allMessages.map(msg => {
    return fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(msg),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }));

  // Nach erfolgreicher Übertragung alle lokalen Nachrichten löschen
  const txDel = db.transaction('messages', 'readwrite');
  const storeDel = txDel.objectStore('messages');
  await storeDel.clear();
}
