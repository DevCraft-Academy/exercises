// helper function for generating a task ID 
// needed for pure function addTask so every task has a singular ID so every entry can be distinguished
export const generateId = (tasks) => {
  return tasks.length ? Math.max(...tasks.map(t => t.id || 0)) + 1 : 1;
};

// changes completition status and calls logging function to log task in console
// example for FP, because object is copied instead of changed
export const completeAndLog = (task) => {
  const clonedTask = Object.assign(Object.create(Object.getPrototypeOf(task)), task);
  clonedTask.toggleCompletion();
  clonedTask.displayDetails();
  return clonedTask;
};
