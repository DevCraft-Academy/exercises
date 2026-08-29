
    document.addEventListener("DOMContentLoaded", (event) => {
    const API_URL = "https://randomfox.ca/floof/";
    const CACHE_TTL = 5 * 60 * 1000; // 5 Minuten

    // In-Memory Cache
    const cache = new Map();

    const resultDiv = document.getElementById("result");
    const button = document.getElementById("loadFox");

    function isCacheValid(entry) {
      return (Date.now() - entry.timestamp) < CACHE_TTL;
    }

    function renderFox(data, fromCache = false) {
      resultDiv.className = fromCache ? "from-cache" : "from-network";
      resultDiv.innerHTML = `
        <strong>${fromCache ? "Aus dem Cache 🗄️" : "Vom Server 🌐"}</strong>
        <img src="${data.image}" alt="Fuchsbild">
      `;
    }

    function renderError(message, cachedData = null) {
      resultDiv.className = "";
      resultDiv.innerHTML = `<p class="error">${message}</p>`;

      if (cachedData) {
        renderFox(cachedData, true);
      }
    }

    async function loadFox() {
      resultDiv.textContent = "Lade Daten...";

      // 1️ Cache prüfen
      if (cache.has(API_URL)) {
        const cachedEntry = cache.get(API_URL);

        if (isCacheValid(cachedEntry)) {
          renderFox(cachedEntry.data, true);
          return;
        } else {
          cache.delete(API_URL);
        }
      }

      // 2️ Netzwerk-Anfrage
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Netzwerkfehler");
        }

        const data = await response.json();

        // 3 Cache speichern
        cache.set(API_URL, {
          data,
          timestamp: Date.now()
        });

        renderFox(data, false);

      } catch (error) {
        // 4️ Fehlerbehandlung mit Cache-Fallback
        if (cache.has(API_URL)) {
          renderError(
            "Netzwerkanfrage fehlgeschlagen – zeige gecachte Daten.",
            cache.get(API_URL).data
          );
        } else {
          renderError("Netzwerkanfrage fehlgeschlagen und keine Cache-Daten verfügbar.");
        }
      }
    }

    window.cache = cache; // Für Debugging-Zweckein im browser console 
    button.addEventListener("click", loadFox);
    });