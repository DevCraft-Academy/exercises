document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const listContainer = document.getElementById("listContainer");
    const viewMoreButton = document.getElementById("more");

    // show first 10 entries
    startButton.addEventListener("click", () => {
        startButton.setAttribute("disabled", "true");
        listContainer.innerHTML = ""; // Clear the list

        // function with improved performance
        const listEntries = 10;
        for (let i = 0; i < listEntries; i++) {
            const listItem = document.createElement("li");
            listItem.textContent = `Item ${i + 1}`;
            listContainer.appendChild(listItem);
        }
        viewMoreButton.classList.remove("hidden");
    });
    
    // add another 10 entries
    viewMoreButton.addEventListener("click", () => {
        viewMoreButton.classList.add("hidden");
        countRun = parseInt(viewMoreButton.value);

        // function with improved performance
        const listEntries = 10 + countRun;
        for (let k = countRun; k < listEntries; k++) {
            const listItem = document.createElement("li");
            listItem.textContent = `Item ${k + 1}`;
            listContainer.appendChild(listItem);
        }
        viewMoreButton.classList.remove("hidden");
        viewMoreButton.value = countRun + 10;
    });
        
});