// open indexDB with idb
async function openLocalDB(name, version, upgradeCallback) {
  return await window.idb.openDB(name, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { autoIncrement: true });
      }
      if (upgradeCallback) upgradeCallback(db);
    }
  });
}


// call loadContent() and setupForm() when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadContent(); // load text
  setupForm();
});

// get dynamic data from mock API (random text) and display it in element with ID 'content' 
function loadContent() {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(data => {
      document.getElementById('content').innerHTML = `<h2>${data.title}</h2><p>${data.body}</p>`;
    });
}

// reads message from form and sends it to the right service
function setupForm() {
  const form = document.getElementById('data-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = form.message.value;
    // if serviceWorker exists send it to serviceWorker and save it to openLocalDB
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const db = await openLocalDB('pwa-db1', 1);
      const tx = db.transaction('messages', 'readwrite');
      await tx.store.add({ message });

      const reg = await navigator.serviceWorker.ready;
      await reg.sync.register('sync-messages');
      alert('Message saved – it will be synched once you are online!');
    } else {
      // Fallback: if service worker doesn't exist (f. ex. because browser doesn't have that function) send it to API
      fetch('https://localhost:8123/api/send', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    form.reset();
  });
}
