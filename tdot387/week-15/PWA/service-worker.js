const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "/",
  "main.css",
  "main.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/api/data") {
    const route = url.searchParams.get("route") || "home";
    const message = route === "about"
      ? "Über uns. (Mock aus Service Worker)"
      : "Willkommen. (Mock aus Service Worker)";

    event.respondWith(new Response(JSON.stringify({ message }), {
      headers: { "Content-Type": "application/json" }
    }));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "syncData") {
    event.waitUntil(syncQueued());
  }
});

async function syncQueued() {
  const cache = await caches.open(CACHE_NAME);
  const queued = (await cache.match("/__queue"))?.json ? await (await cache.match("/__queue")).json() : [];

  for (const item of queued) {
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
    } catch {}
  }

  await cache.put("/__queue", new Response(JSON.stringify([]), {
    headers: { "Content-Type": "application/json" }
  }));
}