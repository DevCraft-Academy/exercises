// Minimal Service Worker für PWA

const CACHE_NAME = 'simple-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Installation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache geöffnet');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch Events - Cache First Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Background Sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Background Sync ausgeführt');
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Benachrichtige die App über erfolgreiche Synchronisierung
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
        client.postMessage({ type: 'SYNC_SUCCESS' });
    });
}

// Cache Update
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Lösche alten Cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});