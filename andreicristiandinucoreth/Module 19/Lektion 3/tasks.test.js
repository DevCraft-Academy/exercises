const { TaskManager } = require("./taskManager");

let taskManager;

beforeEach(() => {
  taskManager = new TaskManager();
});

describe("Task Creation", () => {
  describe("with default values", () => {
    let task;

    beforeEach(() => {
      task = taskManager.createTask({
        title: "Write tests",
        description: "Organize test suite",
      });
    });

    test("should create a task", () => {
      expect(task.id).toBeDefined();
      expect(task.title).toBe("Write tests");
    });

    test("should have default status", () => {
      expect(task.status).toBe("pending");
    });

    test("should have default priority of medium", () => {
      expect(task.priority).toBe("medium");
    });
  });

  describe("with invalid data", () => {
    test("should throw error if no title", () => {
      expect(() => {
        taskManager.createTask({ description: "No title" });
      }).toThrow("Title is required");
    });

    test("should throw error if title is empty string", () => {
      expect(() => {
        taskManager.createTask({ title: "", description: "Empty title" });
      }).toThrow("Title is required");
    });
  });

  describe("with different priority levels", () => {
    test("should create task with high priority", () => {
      const task = taskManager.createTask({
        title: "Urgent task",
        description: "High priority",
        priority: "high",
      });

      expect(task.priority).toBe("high");
    });

    test("should create task with low priority", () => {
      const task = taskManager.createTask({
        title: "Minor task",
        description: "Low priority",
        priority: "low",
      });

      expect(task.priority).toBe("low");
    });

    test("should throw error if priority is invalid", () => {
      expect(() => {
        taskManager.createTask({
          title: "Task",
          description: "Invalid priority",
          priority: "urgent",
        });
      }).toThrow("Invalid priority level");
    });
  });
});

describe("Task Completion", () => {
  describe("completion logic", () => {
    let task;

    beforeEach(() => {
      task = taskManager.createTask({
        title: "Test task",
        description: "For testing",
      });
    });

    test("should complete a task", () => {
      taskManager.completeTask(task.id);

      const completedTask = taskManager.getTask(task.id);
      expect(completedTask.status).toBe("completed");
    });

    test("should set completion timestamp", () => {
      const before = Date.now();
      taskManager.completeTask(task.id);
      const after = Date.now();

      const completedTask = taskManager.getTask(task.id);
      expect(completedTask.completedAt).toBeGreaterThanOrEqual(before);
      expect(completedTask.completedAt).toBeLessThanOrEqual(after);
    });

    test("should not allow completing a task twice", () => {
      taskManager.completeTask(task.id);

      expect(() => {
        taskManager.completeTask(task.id);
      }).toThrow("Task is already completed");
    });
  });

  describe("invalid actions", () => {
    test("should throw error if id is invalid", () => {
      expect(() => {
        taskManager.completeTask("invalid-id");
      }).toThrow("Task not found");
    });
  });
});

describe("Task Priority", () => {
  test("should update priority", () => {
    const task = taskManager.createTask({
      title: "Task",
      description: "Medium priority",
    });

    taskManager.updatePriority(task.id, "high");

    const updatedTask = taskManager.getTask(task.id);
    expect(updatedTask.priority).toBe("high");
  });
});

describe("Task Listing", () => {
  let allTasks;
  let firstTask;

  beforeEach(() => {
    taskManager.createTask({ title: "Task 1", description: "First" });
    taskManager.createTask({ title: "Task 2", description: "Second" });
    taskManager.createTask({ title: "Task 3", description: "Third" });

    allTasks = taskManager.listTasks();
    firstTask = allTasks[0];
  });

  afterEach(() => {
    // Clear tasks after each test to ensure isolation
    taskManager.tasks = [];
    taskManager.nextId = 1;

    allTasks = null;
    firstTask = null;
  });

  test("should list tasks", () => {
    expect(allTasks).toHaveLength(3);
  });

  test("should filter by status", () => {
    taskManager.completeTask(firstTask.id);

    const pendingTasks = taskManager.listTasks({ status: "pending" });
    expect(pendingTasks).toHaveLength(2);
  });

  test("should filter by priority", () => {
    taskManager.updatePriority(firstTask.id, "high");

    const highPriorityTasks = taskManager.listTasks({ priority: "high" });
    expect(highPriorityTasks).toHaveLength(1);
    expect(highPriorityTasks[0].priority).toBe("high");
  });
});
