Übung: Performance Excercise

- Alleine durch das Einfügen von Fragmenten wird die Ladedauer reduziert.

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
      const li = document.createElement("li");
      li.textContent = `Item ${i + 1}`;
      fragment.appendChild(li);
    }
    listContainer.appendChild(fragment);

    Mit dieser Methode wird nur ein Element in den DOM eingefügt statt 1000.

- Durch Chunking kann ebenfalls die Ladezeit verringert werden. In diesem Fall wird die Arbeit in Chunks aus 100-200 Elementen zerlegt. Hierfür muss eine Extrafunktion geschrieben werden:

const total = 1000;
const chunkSize = 100;

function renderChunk(start = 0) {
    const end = Math.min(start + chunkSize, total);
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const li = document.createElement("li");
      li.textContent = `Item ${i + 1}`;
      fragment.appendChild(li);
    }
    listContainer.appendChild(fragment);

    if (end < TOTAL) {
      requestAnimationFrame(() => renderChunk(end));
    }
  }


Messung:

Umgebung: 
    - Chrome v. 141
    - CPU: 4x slowdown
    - Network: 3G

Ladezeit:

Original Codepen
    - System: 1,205ms
    - Scripting: 34ms
    - Rendering: 33ms
    - Painting: 12ms
    - Total: 1,804ms

Variante A (Fragmente):
    - System: 730ms
    - Scripting: 24ms
    - Rendering: 19ms
    - Painting: 14ms
    - Total: 1,702ms

Variante B (Chunking):
    - System: 713ms
    - Scripting: 11ms
    - Rendering: 1ms
    - Painting: 0ms
    - Total: 756ms

Beide Varianten verkürzen also die Ladezeit.