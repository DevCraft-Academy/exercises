const { TaskManager } = require('./taskManager');

// ⚠️ WARNUNG: Diese Test-Datei ist absichtlich chaotisch!
// Deine Aufgabe ist es, sie zu refactoren.

// ⚠️ DANGER: Shared instance between tests!
// The first test uses this shared TaskManager - if one test modifies it,
// other tests see those changes. Tests would pass/fail depending on run order.
// This is why we create fresh instances in each test instead.
const taskManager = new TaskManager();

test('creates task', () => {
  const task = taskManager.createTask({
    title: 'Write tests',
    description: 'Organize test suite'
  });

  expect(task.id).toBeDefined();
  expect(task.title).toBe('Write tests');
});

test('task has default status', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Write tests',
    description: 'Organize test suite'
  });

  expect(task.status).toBe('pending');
});

test('task default priority is medium', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Write tests',
    description: 'Organize test suite'
  });

  expect(task.priority).toBe('medium');
});

test('no title throws', () => {
  const tm = new TaskManager();
  expect(() => {
    tm.createTask({ description: 'No title' });
  }).toThrow('Title is required');
});

test('empty string title', () => {
  const tm = new TaskManager();
  expect(() => {
    tm.createTask({ title: '', description: 'Empty title' });
  }).toThrow('Title is required');
});

test('complete task', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Test task',
    description: 'For testing'
  });

  tm.completeTask(task.id);

  const completedTask = tm.getTask(task.id);
  expect(completedTask.status).toBe('completed');
});

test('completion timestamp', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Test task',
    description: 'For testing'
  });

  const before = Date.now();
  tm.completeTask(task.id);
  const after = Date.now();

  const completedTask = tm.getTask(task.id);
  expect(completedTask.completedAt).toBeGreaterThanOrEqual(before);
  expect(completedTask.completedAt).toBeLessThanOrEqual(after);
});

test('cant complete twice', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Test task',
    description: 'For testing'
  });

  tm.completeTask(task.id);

  expect(() => {
    tm.completeTask(task.id);
  }).toThrow('Task is already completed');
});

test('invalid id', () => {
  const tm = new TaskManager();
  expect(() => {
    tm.completeTask('invalid-id');
  }).toThrow('Task not found');
});

test('high priority', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Urgent task',
    description: 'High priority',
    priority: 'high'
  });

  expect(task.priority).toBe('high');
});

test('low priority works', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Minor task',
    description: 'Low priority',
    priority: 'low'
  });

  expect(task.priority).toBe('low');
});

test('bad priority', () => {
  const tm = new TaskManager();
  expect(() => {
    tm.createTask({
      title: 'Task',
      description: 'Invalid priority',
      priority: 'urgent'
    });
  }).toThrow('Invalid priority level');
});

test('update priority', () => {
  const tm = new TaskManager();
  const task = tm.createTask({
    title: 'Task',
    description: 'Medium priority'
  });

  tm.updatePriority(task.id, 'high');

  const updatedTask = tm.getTask(task.id);
  expect(updatedTask.priority).toBe('high');
});

test('list tasks', () => {
  const tm = new TaskManager();
  tm.createTask({ title: 'Task 1', description: 'First' });
  tm.createTask({ title: 'Task 2', description: 'Second' });
  tm.createTask({ title: 'Task 3', description: 'Third' });

  const tasks = tm.listTasks();
  expect(tasks).toHaveLength(3);
});

test('filter by status', () => {
  const tm = new TaskManager();
  tm.createTask({ title: 'Task 1', description: 'First' });
  tm.createTask({ title: 'Task 2', description: 'Second' });
  tm.createTask({ title: 'Task 3', description: 'Third' });

  const task = tm.listTasks()[0];
  tm.completeTask(task.id);

  const pendingTasks = tm.listTasks({ status: 'pending' });
  expect(pendingTasks).toHaveLength(2);
});

test('filter by priority', () => {
  const tm = new TaskManager();
  tm.createTask({ title: 'Task 1', description: 'First' });
  tm.createTask({ title: 'Task 2', description: 'Second' });
  tm.createTask({ title: 'Task 3', description: 'Third' });

  const task = tm.listTasks()[0];
  tm.updatePriority(task.id, 'high');

  const highPriorityTasks = tm.listTasks({ priority: 'high' });
  expect(highPriorityTasks).toHaveLength(1);
  expect(highPriorityTasks[0].priority).toBe('high');
});
