const { TaskManager } = require('./taskManager');

// ⚠️ WARNUNG: Diese Test-Datei ist absichtlich chaotisch!
// Deine Aufgabe ist es, sie zu refactoren.

// ⚠️ DANGER: Shared instance between tests!
// The first test uses this shared TaskManager - if one test modifies it,
// other tests see those changes. Tests would pass/fail depending on run order.
// This is why we create fresh instances in each test instead.
let taskManager

beforeEach(() => {
  taskManager = new TaskManager();
});

describe('Task Manager', () => {

  describe('Task creation', () => {
    test('should create a task with id and title', () => {
      const task = taskManager.createTask({
        title: 'Write tests',
        description: 'Organize test suite'
      });

      expect(task.id).toBeDefined();
      expect(task.title).toBe('Write tests');
    });

    test('should create a task with default status pending', () => {
      const task = taskManager.createTask({
        title: 'Write tests',
        description: 'Organize test suite'
      });

      expect(task.status).toBe('pending');
    });

    test('should default task priority to medium', () => {
      const task = taskManager.createTask({
        title: 'Write tests',
        description: 'Organize test suite'
      });

      expect(task.priority).toBe('medium');
    });
  });

  describe('Task validation', () => {

    test('should throw an error when title is missing', () => {
      expect(() => {
        taskManager.createTask({ description: 'No title' });
      }).toThrow('Title is required');
    });

    test('should throw an error when title is empty', () => {
      expect(() => {
        taskManager.createTask({ title: '', description: 'Empty title' });
      }).toThrow('Title is required');
    });

    test('should throw an error for invalid priority', () => {
      expect(() => {
        taskManager.createTask({
          title: 'Task',
          description: 'Invalid priority',
          priority: 'urgent'
        });
      }).toThrow('Invalid priority level');
    });

    test('should throw an error for invalid task id', () => {
      expect(() => {
        taskManager.completeTask('invalid-id');
      }).toThrow('Task not found');
    });
  });

  describe('Task completion', () => {
    test('should mark a task as completed', () => {
      const task = taskManager.createTask({
        title: 'Test task',
        description: 'For testing'
      });

      taskManager.completeTask(task.id);

      const completedTask = taskManager.getTask(task.id);
      expect(completedTask.status).toBe('completed');
    });

    test('should set a completion timestamp', () => {
      const task = taskManager.createTask({
        title: 'Test task',
        description: 'For testing'
      });

      const before = Date.now();
      taskManager.completeTask(task.id);
      const after = Date.now();

      const completedTask = taskManager.getTask(task.id);
      expect(completedTask.completedAt).toBeGreaterThanOrEqual(before);
      expect(completedTask.completedAt).toBeLessThanOrEqual(after);
    });

    test('hould not complete a task twice', () => {
      const task = taskManager.createTask({
        title: 'Test task',
        description: 'For testing'
      });

      taskManager.completeTask(task.id);

      expect(() => {
        taskManager.completeTask(task.id);
      }).toThrow('Task is already completed');
    });
  });

  describe('Task priority', () => {
    test('should accept low priority', () => {
      const task = taskManager.createTask({
        title: 'Minor task',
        description: 'Low priority',
        priority: 'low'
      });

      expect(task.priority).toBe('low');
    });

    test('should accept high priority', () => {
      const task = taskManager.createTask({
        title: 'Urgent task',
        description: 'High priority',
        priority: 'high'
      });

      expect(task.priority).toBe('high');
    });

    test('should update a task priority', () => {
      const task = taskManager.createTask({
        title: 'Task',
        description: 'Medium priority'
      });

      taskManager.updatePriority(task.id, 'high');

      const updatedTask = taskManager.getTask(task.id);
      expect(updatedTask.priority).toBe('high');
    });
  });

  describe('Task filtering', () => {
    beforeEach(() => {
      taskManager.createTask({ title: 'Task 1', description: 'First' });
      taskManager.createTask({ title: 'Task 2', description: 'Second' });
      taskManager.createTask({ title: 'Task 3', description: 'Third' });
    });

    test('should list all tasks', () => {
      const tasks = taskManager.listTasks();
      expect(tasks).toHaveLength(3);
    });

    test('should filter tasks by status', () => {
      const task = taskManager.listTasks()[0];
      taskManager.completeTask(task.id);

      const pendingTasks = taskManager.listTasks({ status: 'pending' });
      expect(pendingTasks).toHaveLength(2);
    });

    test('should filter tasks by priority', () => {
      const task = taskManager.listTasks()[0];
      taskManager.updatePriority(task.id, 'high');

      const highPriorityTasks = taskManager.listTasks({ priority: 'high' });
      expect(highPriorityTasks).toHaveLength(1);
      expect(highPriorityTasks[0].priority).toBe('high');
    });
  });
})


