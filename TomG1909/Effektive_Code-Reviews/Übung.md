Code-Review
Verbesserungsvorschläge:

- ggf. aria-labels, label für Input-Feld und semantisches html einsetzen zur besseren Lesbarkeit und barrierefreiheit
- statt innerHtml zu verwenden sollte man textContent verwenden um die Sicherheit zu erhöhen und eigenes Element für den delete Button
- Optional Möglichkeit über Enter Eingabewert der Liste hinzufügen

Verbessertes Codebeispiel:

document.addEventListener("DOMContentLoaded", () => {
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");

    const createTaskItem = (taskText) => {
        const listItem = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("aria-label", `Delete task: ${taskText}`);

        deleteButton.addEventListener("click", () => {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(span);
        listItem.appendChild(deleteButton);

        return listItem;
    };

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);
            taskInput.value = "";
            taskInput.focus();
        }
    });

    // Optional: Task hinzufügen per Enter-Taste
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTaskButton.click();
        }
    });

});
