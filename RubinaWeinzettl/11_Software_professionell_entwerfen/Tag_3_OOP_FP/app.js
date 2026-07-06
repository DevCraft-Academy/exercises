import { addTask } from './functions/addTask.js';
import { completeAndLog } from './functions/helpers.js';

/**
 *  Client Controller: connects UI and logic
 */

let tasks = [];

const form = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const taskListDiv = document.getElementById('taskList');

// adds task to list
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (title && description) {
    tasks = addTask(tasks, { title, description });
    titleInput.value = '';
    descInput.value = '';
    renderTasks();
  }
});

// renders task and appends it to list
function renderTasks() {
  taskListDiv.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task' + (task.isCompleted ? ' completed' : '');

    taskDiv.innerHTML = `
      <strong>${task.title}</strong><br/>
      ${task.description}<br/>
      <em>Status:</em> ${task.isCompleted ? '✅ Erledigt' : '❌ Offen'}
      <br/>
      <button data-index="${index}">🔁 Umschalten</button>
    `;

    taskDiv.querySelector('button').addEventListener('click', () => {
      task.toggleCompletion();
      renderTasks();
    });

    taskListDiv.appendChild(taskDiv);
  });
}
