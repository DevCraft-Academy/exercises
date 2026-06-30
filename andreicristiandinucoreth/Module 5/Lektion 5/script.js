document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const listContainer = document.getElementById("listContainer");
    const countContainer = document.getElementById("count");

    const listSize = 100000;

    const generate = (itemsLeft) => {
        if (itemsLeft === 0 )
            return;

        // do a chunck
        for (let i = 0; i < 100 && itemsLeft > 0; i++, itemsLeft--) {
            const listItem = document.createElement("li");
            //listItem.textContent = `Item ${listSize - itemsLeft + 1}`;
            listItem.textContent = '*';
            countContainer.textContent = `Total items: ${listSize - itemsLeft + 1}`;
            listContainer.appendChild(listItem);
        }
        
        requestAnimationFrame(() => generate(itemsLeft));
    }

    startButton.addEventListener("click", () => {
        startButton.setAttribute("disabled", "true");
        listContainer.innerHTML = ""; // Clear the list

        // Simulate a costly operation (e.g., rendering a large list)
        generate(listSize)
    });
});
