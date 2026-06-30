import { addTask } from './functions/addTask.js';
import { TimedTask } from './classes/TimedTask.js';
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
    // build toggle button to change completition status
    taskDiv.innerHTML = `
      <strong>${task.title}</strong><br/>
      ${task.description}<br/>
      <em>Status:</em> ${task.isCompleted ? '✅ Erledigt' : '❌ Offen'}
      <br/>
      <div id='start' style="display: none;"> ${new Date(Date.now()).toLocaleTimeString()}</div>
      <br/>
      <button data-index="${index}">🔁 Umschalten</button>
    `;

    taskDiv.querySelector('button').addEventListener('click', () => {
      task.toggleCompletion();
      // TimedTask is currently not implemented in FrontEnd, but used to display start and end date of task in console
      const timedDemoTask = new TimedTask(task.title, task.description, document.getElementById('start').innerHTML, new Date(Date.now()).toLocaleTimeString());
      timedDemoTask.displayDetails(); // log details including start and end time
      renderTasks();
    });

    taskListDiv.appendChild(taskDiv);
  });
}
