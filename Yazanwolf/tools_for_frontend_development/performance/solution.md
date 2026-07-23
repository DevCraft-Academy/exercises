## Optimize the loop
In the original code, all 1000 list items are generated in a single run, which can cause noticeable rendering slowdowns. You can improve this by splitting the list creation into smaller chunks and using JavaScript’s requestAnimationFrame. This approach leads to smoother rendering and a more responsive user experience.

document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.getElementById("startButton");
  const listRoot = document.getElementById("listContainer");

  const maxEntries = 1000;
  let index = 0;

  function renderBatch() {
    const batchLimit = 50; // number of items per frame
    let count = 0;

    while (count < batchLimit && index < maxEntries) {
      const li = document.createElement("li");
      li.textContent = `Item ${index + 1}`;
      listRoot.appendChild(li);

      index++;
      count++;
    }

    if (index < maxEntries) {
      requestAnimationFrame(renderBatch);
    } else {
      btnStart.disabled = false; // re-enable button
    }
  }

  btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    listRoot.innerHTML = ""; // reset list
    index = 0; // reset counter
    renderBatch(); // start incremental rendering
  });
});

## Implement lazy loading mechanism
To further enhance performance, we can implement lazy loading for the list items. With this approach, items are only created when they enter the visible area (viewport). This significantly reduces the initial rendering workload.

// Updated lazy loading implementation

function initLazyRendering() {
  const placeholders = document.querySelectorAll(".lazy-item");

  placeholders.forEach((placeholder) => {
    const io = new IntersectionObserver((observedEntries) => {
      observedEntries.forEach((item) => {
        if (!item.isIntersecting) return;

        const newElement = document.createElement("li");
        newElement.textContent = `Item ${item.target.dataset.index}`;
        listContainer.appendChild(newElement);

        io.unobserve(item.target);
      });
    });

    io.observe(placeholder);
  });
}

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  listContainer.innerHTML = ""; // clear existing list
  initLazyRendering(); // trigger lazy rendering
});