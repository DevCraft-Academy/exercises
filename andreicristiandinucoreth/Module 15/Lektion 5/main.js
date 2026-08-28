if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => {
        console.log("ServiceWorker registriert:", reg.scope);
      })
      .catch((err) => {
        console.warn("ServiceWorker Registrierung fehlgeschlagen:", err);
      });
  });
}

// Dynamisch Inhalte in die App-Shell laden
const appShell = document.getElementById("app-shell");

function loadContent() {
  // Dynamische Daten von einer Mock-API abrufen
  fetch("https://randomfox.ca/floof/")
    .then((response) => response.json())
    .then((data) => {
      const info = document.getElementById("info");
      const content = document.createElement("div");
      content.innerHTML = `<img src="${data.image}" alt="Random Fox" />`;
      info.appendChild(content);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

loadContent();

const loadBtn = document.getElementById("loadBtn");

loadBtn.addEventListener("click", () => {
  loadContent();
});

// Funktion zum Übermitteln von Daten an den Server mit Fehlerbehandlung
function submitData(formData) {
  fetch("/api/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Serverantwort war nicht OK");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Daten erfolgreich übermittelt:", data);
    })
    .catch((error) => {
      console.warn("Fehler beim Übermitteln der Daten:", error);
      // Optional: Mock-Implementierung als Fallback
      setTimeout(() => {
        console.log("Mock: Datenübermittlung simuliert.");
      }, 500);
    });
}

// Event-Listener für die Formularübermittlung
const form = document.getElementById("submit-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    submitData(formData);

    // Background Sync nach der Datenübermittlung auslösen
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register("syncData");
      });
    }
  });
}
