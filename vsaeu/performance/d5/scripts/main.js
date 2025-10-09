document.getElementById('loadBtn').addEventListener('click', () => {
  const demo = document.getElementById('demo');
  demo.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = `Demo Item ${i+1}`;
    demo.appendChild(card);
  }
});

// Service Worker registration helper (will be no-op if sw.js is missing)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('ServiceWorker registriert:', reg.scope);
    }).catch(err => {
      console.warn('ServiceWorker Registrierung fehlgeschlagen:', err);
    });
  });
}

// Dynamisch Inhalte in die App-Shell laden
const appShell = document.getElementById('app-shell');

function loadContent() {
  // Dynamische Daten von einer Mock-API abrufen
  fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
          // App-Shell mit dynamischen Inhalten aktualisieren
          appShell.innerHTML = ''; // Vorherigen Inhalt entfernen
          const content = document.createElement('div');
          content.innerHTML = `<p>${data.message}</p>`;
          appShell.appendChild(content);
        })
    .catch(error => {
      console.warn('Fehler beim Laden der Daten:', error);
    });
}

// Funktion zum Übermitteln von Daten an den Server mit Fehlerbehandlung
function submitData(formData) {
  fetch('/api/submit', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Serverantwort war nicht OK');
    }
    return response.json();
  })
  .then(data => {
    console.log('Daten erfolgreich übermittelt:', data);
  })
  .catch(error => {
    console.warn('Fehler beim Übermitteln der Daten:', error);
    // Optional: Mock-Implementierung als Fallback
    setTimeout(() => {
      console.log('Mock: Datenübermittlung simuliert.');
    }, 500);
  });
}

// Event-Listener für die Formularübermittlung
const form = document.getElementById('submit-form');
if (form) {
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
}