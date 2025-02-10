index.html:

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fuchs-Bilder Caching</title>
    <style>
      #cache-indicator {
        display: none;
        background-color: #e0ffe0;
        padding: 10px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Fuchs-Bilder Caching</h1>
    <button id="fetch-button">Fuchs-Bild abrufen</button>
    <div id="image-container"></div>
    <div id="cache-indicator">Daten aus dem Cache</div>

    <script src="script.js"></script>
  </body>
</html>

script.js:

const cache = {};

document
  .getElementById("fetch-button")
  .addEventListener("click", fetchFoxImage);

function fetchFoxImage() {
  const url = "https://randomfox.ca/floof/";

  if (cache[url] && Date.now() - cache[url].timestamp < 300000) {
    displayImage(cache[url].image, true);
  } else {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netzwerkanfrage fehlgeschlagen");
        }
        return response.json();
      })
      .then((data) => {
        cache[url] = { image: data.image, timestamp: Date.now() }; // Speichern im Cache mit Zeitstempel
        displayImage(data.image, false);
      })
      .catch((error) => {
        console.error(error);
        alert("Fehler beim Abrufen des Bildes.");

        if (cache[url]) {
          displayImage(cache[url].image, true);
        }
      });
  }
}

function displayImage(imageUrl, fromCache) {
  const imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = `<img src="${imageUrl}" alt="Fuchs" style="max-width: 300px;">`;

  const cacheIndicator = document.getElementById("cache-indicator");
  if (fromCache) {
    cacheIndicator.style.display = "block";
  } else {
    cacheIndicator.style.display = "none";
  }
}

kurz Beschreibung:

# Caching-Strategie

In dieser Anwendung habe ich ein einfaches In-Memory-Caching implementiert, um die Leistung zu verbessern und unnötige Netzwerkanfragen zu reduzieren.
Die gecachten Daten haben eine Verfallszeit von 5 Minuten. Wenn der Benutzer dieselbe Anfrage innerhalb dieser Zeit erneut stellt, 
werden die Daten aus dem Cache abgerufen. Bei fehlgeschlagenen Anfragen wird überprüft, ob die Daten im Cache verfügbar sind, und diese werden angezeigt.

## Herausforderungen

Eine der Herausforderungen war die Implementierung der Verfallszeit für die gecachten Daten. Ich musste sicherstellen, 
dass die Zeitstempel korrekt gespeichert und überprüft wurden. Außerdem war es wichtig, eine benutzerfreundliche Fehlermeldung anzuzeigen,
wenn eine Netzwerkanfrage fehlschlug.
