// Hole das Start-Button-Element anhand seiner ID
const startButton = document.getElementById("startButton");
// Hole das List-Container-Element anhand seiner ID
const listContainer = document.getElementById("listContainer");

// Füge dem Start-Button einen Klick-Event-Listener hinzu
startButton.addEventListener("click", () => {
  // Deaktiviere den Start-Button, um mehrfache Klicks zu verhindern
  startButton.setAttribute("disabled", "true");
  // Leere den List-Container
  listContainer.innerHTML = "";
  // Initialisiere das Lazy Loading von Elementen
  setupLazyLoading();
});

// Funktion zur Einrichtung des Lazy Loadings von Listenelementen
function setupLazyLoading() {
  // Initialisiere die Anzahl der geladenen Elemente auf 0
  let loadedItems = 0;
  // Setze die Gesamtanzahl der zu ladenden Elemente
  const totalItems = 1000;
  // Setze die Anzahl der Elemente pro Batch
  const batchSize = 20; // Anzahl der Elemente pro Batch

  // Erstelle einen IntersectionObserver, um zu beobachten, wann Elemente sichtbar werden
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Überprüfe, ob das beobachtete Element sichtbar ist und ob noch weitere Elemente geladen werden können
      if (entry.isIntersecting && loadedItems < totalItems) {
        // Beende die Beobachtung des aktuellen Platzhalters
        observer.unobserve(entry.target); // Stoppe Beobachtung des Platzhalters
        // Lade weitere Elemente
        loadMoreItems(); // Lade mehr Elemente
      }
    });
  });

  // Funktion zum Laden weiterer Elemente in die Liste
  function loadMoreItems() {
    // Erstelle ein Dokument-Fragment, um die neuen Elemente zu speichern
    const fragment = document.createDocumentFragment();
    // Schleife zum Erstellen und Hinzufügen neuer Elemente zum Fragment
    for (let i = 0; i < batchSize && loadedItems < totalItems; i++, loadedItems++) {
      // Erstelle ein neues Listenelement
      const listItem = document.createElement("li");
      // Setze den Textinhalt des Listenelements
      listItem.textContent = `Element ${loadedItems + 1}`;
      // Füge das Listenelement dem Fragment hinzu
      fragment.appendChild(listItem);
    }
    // Füge das Fragment dem List-Container hinzu
    listContainer.appendChild(fragment);

    // Hole das letzte Element im List-Container
    const lastItem = listContainer.lastElementChild;
    // Wenn noch weitere Elemente geladen werden können, beobachte das letzte Element
    if (loadedItems < totalItems) {
      observer.observe(lastItem);
    }
  }

  // Lade die erste Charge von Elementen
  loadMoreItems();
}
