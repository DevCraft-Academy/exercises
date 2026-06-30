const { TaskManager } = require("./taskManager");

// ⚠️ WARNUNG: Diese Test-Datei ist absichtlich chaotisch!
// Deine Aufgabe ist es, sie zu refactoren.

// Removed shared instance to avoid state leaking between tests

describe("Task creation", () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
  });

  test("should create task with valid parameters", () => {
    const task = tm.createTask({
      title: "Write tests",
      description: "Organize test suite",
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe("Write tests");
  });

  test("should throw title is required error when title is missing", () => {
    expect(() => {
      tm.createTask({ description: "No title" });
    }).toThrow("Title is required");
  });

  test("should throw title is required error when title is empty", () => {
    expect(() => {
      tm.createTask({ title: "", description: "Empty title" });
    }).toThrow("Title is required");
  });
});

describe("Task status", () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
  });

  test("should set default status when task is created", () => {
    const task = tm.createTask({
      title: "Write tests",
      description: "Organize test suite",
    });

    expect(task.status).toBe("pending");
  });

  test("should set default priority when task is created", () => {
    const task = tm.createTask({
      title: "Write tests",
      description: "Organize test suite",
    });

    expect(task.priority).toBe("medium");
  });
});

describe("Task completion", () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
  });

  test("should update status to completed when task is completed", () => {
    const task = tm.createTask({
      title: "Test task",
      description: "For testing",
    });

    tm.completeTask(task.id);

    const completedTask = tm.getTask(task.id);
    expect(completedTask.status).toBe("completed");
  });

  test("should throw error when completing non-existent task", () => {
    expect(() => {
      tm.completeTask("invalid-id");
    }).toThrow("Task not found");
  });

  test("should set completion timestamp when task is completed", () => {
    const task = tm.createTask({
      title: "Test task",
      description: "For testing",
    });

    const before = Date.now();
    tm.completeTask(task.id);
    const after = Date.now();

    const completedTask = tm.getTask(task.id);
    expect(completedTask.completedAt).toBeGreaterThanOrEqual(before);
    expect(completedTask.completedAt).toBeLessThanOrEqual(after);
  });

  test("should throw error when completing already completed task", () => {
    const task = tm.createTask({
      title: "Test task",
      description: "For testing",
    });

    tm.completeTask(task.id);

    expect(() => {
      tm.completeTask(task.id);
    }).toThrow("Task is already completed");
  });
});

describe("Task Priority", () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
  });

  test("should create task with high priority when priority is set to high", () => {
    const task = tm.createTask({
      title: "Urgent task",
      description: "High priority",
      priority: "high",
    });

    expect(task.priority).toBe("high");
  });

  test("should create task with low priority when priority is set to low", () => {
    const task = tm.createTask({
      title: "Minor task",
      description: "Low priority",
      priority: "low",
    });

    expect(task.priority).toBe("low");
  });

  test("should throw error when creating task with invalid priority", () => {
    expect(() => {
      tm.createTask({
        title: "Task",
        description: "Invalid priority",
        priority: "urgent",
      });
    }).toThrow("Invalid priority level");
  });

  test("should update priority when priority is updated", () => {
    const task = tm.createTask({
      title: "Task",
      description: "Medium priority",
    });

    tm.updatePriority(task.id, "high");

    const updatedTask = tm.getTask(task.id);
    expect(updatedTask.priority).toBe("high");
  });
});

describe("Display Tasks", () => {
  let tm;
  beforeEach(() => {
    tm = new TaskManager();
  });

  test("should list all tasks when created multiple tasks", () => {
    tm.createTask({ title: "Task 1", description: "First" });
    tm.createTask({ title: "Task 2", description: "Second" });
    tm.createTask({ title: "Task 3", description: "Third" });

    const tasks = tm.listTasks();
    expect(tasks).toHaveLength(3);
  });

  describe("filtered", () => {
    beforeEach(() => {
      tm.createTask({ title: "Task 1", description: "First" });
      tm.createTask({ title: "Task 2", description: "Second" });
      tm.createTask({ title: "Task 3", description: "Third" });
    });

    test("should filter by status", () => {
      const task = tm.listTasks()[0];
      tm.completeTask(task.id);

      const pendingTasks = tm.listTasks({ status: "pending" });
      expect(pendingTasks).toHaveLength(2);
    });

    test("should filter by priority", () => {
      const task = tm.listTasks()[0];
      tm.updatePriority(task.id, "high");

      const highPriorityTasks = tm.listTasks({ priority: "high" });
      expect(highPriorityTasks).toHaveLength(1);
      expect(highPriorityTasks[0].priority).toBe("high");
    });
  });
});
