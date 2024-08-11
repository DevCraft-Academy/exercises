// Zu cachende Dateien
const CACHE_NAME = "simplecache";
const urlsToCache = ["index.html", "style.css", "script.js"];

// Installations-Event: Dateien cachen
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching Files");
      return cache.addAll(urlsToCache);
    })
  );
});


// Fetch-Event: Aus dem Cache bedienen, falls offline
self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetching ", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Service Worker: Serving from cache", event.request.url);
        return response;
      }
      console.log("Service Worker: Fetching from network", event.request.url);
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone()); // use clone, because response JS object is only available once (its a stream)
          return response;
        });
      });
    })
  );
});
