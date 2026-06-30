// Lighthouse: JS könnte noch komprimiert werden - hab ich jetzt nicht umgesetzt
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const listContainer = document.getElementById("listContainer");
  const totalItems = 1000;
  let currentIndex = 0;

  const generateChunk = () => {
    const chunkSize = 50; // Anzahl der Einträge, die pro Frame generiert werden sollen
    for (let i = 0; i < chunkSize; i++) {
      if (currentIndex < totalItems) {
        const listItem = document.createElement("li");
        listItem.textContent = `Eintrag ${currentIndex + 1}`;
        listContainer.appendChild(listItem);
        currentIndex++;
      } else {
        startButton.removeAttribute("disabled");
        return; // Alle Einträge wurden generiert
      }
    }
    requestAnimationFrame(generateChunk); // Fortsetzung der Generierung
  };

  startButton.addEventListener("click", () => {
    startButton.setAttribute("disabled", "true");
    listContainer.innerHTML = ""; // Liste leeren
    generateChunk(); // Beginne die schrittweise Generierung
  });
});




