
// Dynamische Inhalte laden (Mock-API)
const content = document.getElementById('content');
const navHome = document.getElementById('nav-home');
const navData = document.getElementById('nav-data');
const form = document.getElementById('data-form');
const input = document.getElementById('input-data');
const formStatus = document.getElementById('form-status');

function showHome() {
  content.innerHTML = '<p>Willkommen zur PWA Demo App!<br>Diese App funktioniert auch offline und synchronisiert Daten im Hintergrund.</p>';
}

function showData() {
  content.innerHTML = '<p>Lade Daten...</p>';
  // Simuliere API Call
  setTimeout(() => {
    const mockData = JSON.parse(localStorage.getItem('mockData') || '[]');
    if (mockData.length === 0) {
      content.innerHTML = '<p>Keine Daten vorhanden.</p>';
    } else {
      content.innerHTML = '<ul>' + mockData.map(d => `<li>${d}</li>`).join('') + '</ul>';
    }
  }, 500);
}

navHome.addEventListener('click', e => { e.preventDefault(); showHome(); });
navData.addEventListener('click', e => { e.preventDefault(); showData(); });

// Initiale Ansicht
showHome();


// Formular-Handling mit Background Sync
form.addEventListener('submit', async e => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  formStatus.textContent = 'Sende...';
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    // Speichere offline und registriere Sync
    const entry = { data: value, timestamp: Date.now() };
    let queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    queue.push(entry);
    localStorage.setItem('syncQueue', JSON.stringify(queue));
    navigator.serviceWorker.ready.then(sw => {
      sw.sync.register('sync-data');
    });
    formStatus.textContent = 'Wird synchronisiert, sobald du online bist.';
  } else {
    // Fallback: direkt speichern
    let mockData = JSON.parse(localStorage.getItem('mockData') || '[]');
    mockData.push(value);
    localStorage.setItem('mockData', JSON.stringify(mockData));
    formStatus.textContent = 'Gespeichert!';
  }
  input.value = '';
  showData();
});

// Service Worker Nachrichten empfangen (für Background Sync)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.action === 'sync-request') {
      // SyncQueue abarbeiten
      let queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
      if (queue.length > 0) {
        let mockData = JSON.parse(localStorage.getItem('mockData') || '[]');
        for (const entry of queue) {
          mockData.push(entry.data);
        }
        localStorage.setItem('mockData', JSON.stringify(mockData));
        localStorage.setItem('syncQueue', '[]');
        formStatus.textContent = 'Daten synchronisiert!';
        showData();
      }
    }
  });
}

// Online/Offline Status anzeigen
window.addEventListener('online', () => { formStatus.textContent = 'Online'; });
window.addEventListener('offline', () => { formStatus.textContent = 'Offline – Daten werden synchronisiert, wenn du wieder online bist.'; });
