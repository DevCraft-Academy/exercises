app.js:

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("Service Worker registriert:", registration);
      })
      .catch((error) => {
        console.error("Service Worker Registrierung fehlgeschlagen:", error);
      });
  });
}

document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const data = document.getElementById("dataInput").value;
    // Hier kannst du die Daten an den Server senden oder in IndexedDB speichern
    console.log("Daten gesendet:", data);
  });
// Registriere den Service Worker und Background Sync
if ("serviceWorker" in navigator && "SyncManager" in window) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("Service Worker registriert:", registration);
      })
      .catch((error) => {
        console.error("Service Worker Registrierung fehlgeschlagen:", error);
      });
  });

  document
    .getElementById("dataForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const data = document.getElementById("dataInput").value;

      // Speichere die Daten in IndexedDB oder einer anderen Speicherlösung
      saveDataToIndexedDB(data);

      // Registriere die Synchronisation
      navigator.serviceWorker.ready.then((registration) => {
        return registration.sync.register("syncData");
      });
    });
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("Service Worker registriert:", registration);
      })
      .catch((error) => {
        console.error("Service Worker Registrierung fehlgeschlagen:", error);
      });
  });
}

document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const data = document.getElementById("dataInput").value;

    // Hier kannst du die Daten an den Server senden oder in IndexedDB speichern
    console.log("Daten gesendet:", data);

    // Zeige die eingegebenen Daten auf der Seite an
    displayData(data);

    // Speichere die Daten in IndexedDB oder einer anderen Speicherlösung
    saveDataToIndexedDB(data);

    // Registriere die Synchronisation
    navigator.serviceWorker.ready.then((registration) => {
      return registration.sync.register("syncData");
    });
  });

// Funktion zum Speichern von Daten in IndexedDB
function saveDataToIndexedDB(data) {
  // IndexedDB verwenden, um die Daten zu speichern
  console.log("Daten in IndexDB gespeichert:", data);
}

// Funktion zum Anzeigen der Daten auf der Seite
function displayData(data) {
  const content = document.getElementById("content");
  const newDataElement = document.createElement("p");
  newDataElement.textContent = `Eingegebene Daten: ${data}`;
  content.appendChild(newDataElement);
}

// Funktion zum Speichern von Daten in IndexedDB
function saveDataToIndexedDB(data) {
  // Hier kannst du IndexedDB verwenden, um die Daten zu speichern
  console.log("Daten in IndexedDB gespeichert:", data);
}

sw.js:

const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/app.js"];

// Installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache-Hit - gib die Antwort zurück
      return response || fetch(event.request);
    })
  );
});

// Aktivierung
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
// Background Sync
self.addEventListener("sync", (event) => {
  if (event.tag === "syncData") {
    event.waitUntil(
      // Hier kannst du die Daten synchronisieren
      syncData()
    );
  }
});

function syncData() {
  // Hier kannst du die Daten an den Server senden
  console.log("Synchronisiere Daten...");
  // Beispiel: fetch('/api/sync', { method: 'POST', body: JSON.stringify(data) });
}
