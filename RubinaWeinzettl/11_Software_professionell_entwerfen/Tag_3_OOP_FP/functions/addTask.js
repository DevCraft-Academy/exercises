import { Task } from '../classes/Task.js';
import { generateId } from './helpers.js';

// pure function: adds new task to tasklist without changing original array and creates a new list instead
export const addTask = (taskList, taskData) => {
  const newTask = new Task(taskData.title, taskData.description); // gererate new task object containing user input
  newTask.id = generateId(taskList); // generate new id
  return [...taskList, newTask]; // return new list containing old, unchanged array including the new list item
};
