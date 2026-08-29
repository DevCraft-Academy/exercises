// Dynamisch Inhalte in die App-Shell laden
const appShell = document.getElementById('app-shell');

function loadContent() {
  // Dynamische Daten von einer Mock-API abrufen
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      // App-Shell mit dynamischen Inhalten aktualisieren
      const content = document.createElement('div');
      content.innerHTML = `<p>${data.message}</p>`;
      appShell.appendChild(content);
    });
}

// Erstes Laden
loadContent();

// Background Sync für Datenaktualisierungen implementieren
function submitData(formData) {
  // Code zum Übermitteln von Daten an den Server
  fetch('/api/submit', {
    method: 'POST',
    body: formData,
  });
}

// Event-Listener für die Formularübermittlung
const form = document.getElementById('submit-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  submitData(formData);

  // Background Sync nach der Datenübermittlung auslösen
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.sync.register('syncData');
    });
  }
});

// Event-Listener für Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'syncData') {
    event.waitUntil(loadContent());
  }
});