if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

const content = document.getElementById("content");

function loadContent(route = "home") {
  content.innerHTML = "<p>Lade...</p>";

  fetch(`/api/data?route=${route}`)
    .then((r) => {
      if (!r.ok) throw new Error("API missing");
      return r.json();
    })
    .then((data) => {
      content.innerHTML = `<p>${data.message}</p>`;
    })
    .catch(() => {
      const messages = {
        home: "Willkommen. (Fallback-Inhalt)",
        about: "Über uns. (Fallback-Inhalt)"
      };
      content.innerHTML = `<p>${messages[route] || "Inhalt."}</p>`;
    });
}

loadContent();

document.querySelectorAll("[data-route]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    loadContent(a.dataset.route);
  });
});

const form = document.getElementById("submit-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());
  form.reset();

  try {
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
    const cache = await caches.open("my-pwa-cache-v1");
    const current = (await cache.match("/__queue"))?.json ? await (await cache.match("/__queue")).json() : [];
    current.push(payload);

    await cache.put("/__queue", new Response(JSON.stringify(current), {
      headers: { "Content-Type": "application/json" }
    }));

    if ("serviceWorker" in navigator && "SyncManager" in window) {
      const reg = await navigator.serviceWorker.ready;
      await reg.sync.register("syncData");
    }
  }
});