# Aufgabe

In dieser Übung wirst du den „Performance”-Tab von Chrome verwenden, um Performance-Bottlenecks auf einer einfachen Webseite zu erkennen und Optimierungsvorschläge zur Verbesserung ihrer Ladezeit zu machen.

Performance verbessern von https://codepen.io/DevCraft/pen/NWVbNMb

# Lösung:

Chunking hilft enorm um fast 500ms - Man könnte das ganze auch mit einem Observer noch weiter verbessern um das zu lazy loaden.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const listContainer = document.getElementById("listContainer");

  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    listContainer.innerHTML = "";

    const totalItems = 1000;
    const chunkSize = 100;
    let index = 0;

    function renderChunk() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < chunkSize && index < totalItems; i++, index++) {
        const li = document.createElement("li");
        li.textContent = `Item ${index + 1}`;
        fragment.appendChild(li);
      }
      listContainer.appendChild(fragment);

      if (index < totalItems) {
        requestIdleCallback(renderChunk);
      } else {
        startButton.disabled = false;
      }
    }

    requestIdleCallback(renderChunk);
  });
});
```

Um dieses Level abzuschließen musst du folgendes tun:

Einen neuen Branch namens bugFix auschecken
Einen Commit machen
Zurück zum main wechseln und noch einmal committen
bugFix auschecken und auf den main rebasen
