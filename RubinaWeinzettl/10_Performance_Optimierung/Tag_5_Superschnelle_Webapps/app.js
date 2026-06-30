// IndexedDB öffnen (mit idb)
async function openDB(name, version, upgradeCallback) {
  return await window.idb.openDB(name, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { autoIncrement: true });
      }
      if (upgradeCallback) upgradeCallback(db);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  setupForm();
});

function loadContent() {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(data => {
      document.getElementById('content').innerHTML = `<h2>${data.title}</h2><p>${data.body}</p>`;
    });
}

function setupForm() {
  const form = document.getElementById('data-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = form.message.value;

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const db = await openDB('pwa-db', 1);
      const tx = db.transaction('messages', 'readwrite');
      await tx.store.add({ message });

      const reg = await navigator.serviceWorker.ready;
      await reg.sync.register('sync-messages');
      alert('Nachricht gespeichert – wird synchronisiert, wenn du online bist.');
    } else {
      // Fallback: Direkt senden
      fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    form.reset();
  });
}
