const { TaskManager } = require('./taskManager');

// ⚠️ WARNUNG: Diese Test-Datei ist absichtlich chaotisch!
// Deine Aufgabe ist es, sie zu refactoren.

// ⚠️ DANGER: Shared instance between tests!
// The first test uses this shared TaskManager - if one test modifies it,
// other tests see those changes. Tests would pass/fail depending on run order.
// This is why we create fresh instances in each test instead.

describe('Tasks creation - with valid data ', () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
  });

  test('should create task with title and description', () => {
    const task = tm.createTask({
      title: 'Write tests',
      description: 'Organize test suite',
    });
    expect(task.id).toBeDefined();
    expect(task.title).toBe('Write tests');
  });

  test('should set default status to pending', () => {
    const task = tm.createTask({
      title: 'Write tests',
      description: 'Organize test suite',
    });
    expect(task.status).toBe('pending');
  });

  test('should set default priority to medium', () => {
    const task = tm.createTask({
      title: 'Write tests',
      description: 'Organize test suite',
    });
    expect(task.priority).toBe('medium');
  });

  test('should return a list of tasks when multiple tasks exist', () => {
    tm.createTask({ title: 'Task 1', description: 'First' });
    tm.createTask({ title: 'Task 2', description: 'Second' });
    tm.createTask({ title: 'Task 3', description: 'Third' });

    const tasks = tm.listTasks();
    expect(tasks).toHaveLength(3);
  });
});

describe('Task creation - with invalid data', () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
  });

  test('should reject task when title is not provided', () => {
    expect(() => {
      tm.createTask({ description: 'No title' });
    }).toThrow('Title is required');
  });

  test('should reject task when title is an empty string', () => {
    expect(() => {
      tm.createTask({ title: '', description: 'Empty title' });
    }).toThrow('Title is required');
  });
});

describe('Task Completion', () => {
  let tm;
  let task;
  beforeEach(() => {
    tm = new TaskManager();
    task = tm.createTask({
      title: 'Test task',
      description: 'For testing',
    });
  });

  test('should not complete already completed task', () => {
    tm.completeTask(task.id);
    expect(() => {
      tm.completeTask(task.id);
    }).toThrow('Task is already completed');
  });

  test('should reject completion when task does not exists', () => {
    expect(() => {
      tm.completeTask('invalid-id');
    }).toThrow('Task not found');
  });

  test('should set status to completed on completed tasks', () => {
    tm.completeTask(task.id);
    const completedTask = tm.getTask(task.id);
    expect(completedTask.status).toBe('completed');
  });

  test('should set completion timestamp', () => {
    const before = Date.now();
    tm.completeTask(task.id);
    const after = Date.now();

    const completedTask = tm.getTask(task.id);
    expect(completedTask.completedAt).toBeGreaterThanOrEqual(before);
    expect(completedTask.completedAt).toBeLessThanOrEqual(after);
  });
});

describe('Task Priority', () => {
  const tm = new TaskManager();

  test('should allow task to have high priority', () => {
    const task = tm.createTask({
      title: 'Urgent task',
      description: 'High priority',
      priority: 'high',
    });

    expect(task.priority).toBe('high');
  });

  test('should allow task to have low priority', () => {
    const task = tm.createTask({
      title: 'Minor task',
      description: 'Low priority',
      priority: 'low',
    });

    expect(task.priority).toBe('low');
  });

  test('should reject invalid priority level', () => {
    expect(() => {
      tm.createTask({
        title: 'Task',
        description: 'Invalid priority',
        priority: 'urgent',
      });
    }).toThrow('Invalid priority level');
  });

  test('should update priority of existing task', () => {
    const task = tm.createTask({
      title: 'Task',
      description: 'Medium priority',
    });

    tm.updatePriority(task.id, 'high');

    const updatedTask = tm.getTask(task.id);
    expect(updatedTask.priority).toBe('high');
  });
});

describe('Task Filtering', () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
    tm.createTask({ title: 'Task 1', description: 'First' });
    tm.createTask({ title: 'Task 2', description: 'Second' });
    tm.createTask({ title: 'Task 3', description: 'Third' });
  });

  test('should filter tasks by status', () => {
    const task = tm.listTasks()[0];
    tm.completeTask(task.id);
    const pendingTasks = tm.listTasks({ status: 'pending' });
    expect(pendingTasks).toHaveLength(2);
  });

  test('should filter tasks by priority', () => {
    tm.createTask({ title: 'Task 1', description: 'First' });
    tm.createTask({ title: 'Task 2', description: 'Second' });
    tm.createTask({ title: 'Task 3', description: 'Third' });

    const task = tm.listTasks()[0];
    tm.updatePriority(task.id, 'high');

    const highPriorityTasks = tm.listTasks({ priority: 'high' });
    expect(highPriorityTasks).toHaveLength(1);
    expect(highPriorityTasks[0].priority).toBe('high');
  });
});
