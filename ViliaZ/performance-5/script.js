// Laden von Content in die App Shell beim DOMContentLoaded Event
document.addEventListener("DOMContentLoaded", async () => {
  await loadContent("./mainContent.html");
  initServiceWorker();
  
  // Event Listener für Button
  document.getElementById("greetBtn").addEventListener("click", () => {
    submitName(document.forms['form']);
  });
});

// Dynamisches Laden von Inhalten in die App-Shell
async function loadContent(url = "/api/data") {
  try {
    const response = await fetch(url);
    const htmlOrJson = await response.json(); // Für Mock-API Inhalte

    const mainContent = document.getElementById("main-content");

    // Aktualisiere den Inhalt der App-Shell dynamisch
    if (typeof htmlOrJson === 'string') {
      mainContent.innerText = htmlOrJson;
    } else {
      const content = document.createElement('div');
      content.innerHTML = `<p>${htmlOrJson.message}</p>`;
      mainContent.appendChild(content);
    }
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

// Array mit verschiedenen Begrüßungen
const greetings = [
  "Hallo, wie geht's?",
  "Guten Tag!",
  "Hi!",
  "Willkommen auf der Testseite!",
  "Hey",
];

// Submit-Funktion für Userdaten und Background Sync durch Worker
function submitName(formData) {
  const userName = formData.fname ? formData.fname.value : "";
  const greetingElement = document.getElementById("greeting");
  const randomIndex = Math.floor(Math.random() * greetings.length);
  greetingElement.textContent = `${greetings[randomIndex]} ${userName}`;

  // Sende Userdaten an die API
  fetch("/example/userdata", {
    method: "POST",
    body: new FormData(formData),
  }).then(() => {
    // Background-Sync aktivieren
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register("syncData");
      });
    }
  }).catch((error) => {
    console.error("Error submitting data:", error);
  });
}

// Event-Listener für Background Sync
self.addEventListener("sync", (event) => {
  if (event.tag === "syncData") {
    event.waitUntil(loadContent()); // Get dynamischen Inhalt
  }
});

// Service Worker Initialisierung
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./worker.js").then(function (registration) {
      if (registration.installing) {
        console.log("Service Worker Installing");
      }
      if (registration.waiting) console.log("Service Worker waiting");
      if (registration.active) console.log("Service Worker active");
    }).catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
  }
}
