const { TaskScheduler } = require("./taskScheduler");

describe("TaskScheduler", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("schedule()", () => {
    test("should execute task after correct delay", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();
      const delayMs = 1000;

      // Act
      scheduler.schedule("testTask", taskFn, delayMs);

      // Assert
      expect(taskFn).not.toBeCalled();

      jest.advanceTimersByTime(delayMs - 1);
      expect(taskFn).not.toBeCalled();

      jest.advanceTimersByTime(1);
      expect(taskFn).toBeCalled();
    });

    test("should record executed tasks", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();
      const delayMs = 500;

      // Act
      scheduler.schedule("task1", taskFn, delayMs);
      jest.advanceTimersByTime(delayMs);

      // Assert
      expect(scheduler.getExecutedTasks()).toContain("task1");
    });
  });

  describe("scheduleRecurring()", () => {
    test("should execute recurring task at intervals", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();
      const intervalMs = 1000;

      // Act
      scheduler.scheduleRecurring("recurringTask", taskFn, intervalMs);

      // Assert
      expect(taskFn).not.toBeCalled();

      jest.advanceTimersByTime(intervalMs);
      expect(taskFn).toBeCalledTimes(1);

      jest.advanceTimersByTime(intervalMs);
      expect(taskFn).toBeCalledTimes(2);
    });

    test("should record executed recurring tasks", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();
      const intervalMs = 500;

      // Act
      scheduler.scheduleRecurring("recurringTask", taskFn, intervalMs);
      jest.advanceTimersByTime(intervalMs * 3);

      // Assert
      expect(scheduler.getExecutedTasks()).toEqual([
        "recurringTask",
        "recurringTask",
        "recurringTask",
      ]);
    });
  });

  describe("cancelAll()", () => {
    test("should prevent scheduled tasks from executing", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();
      const delayMs = 1000;

      // Act
      scheduler.schedule("taskToCancel", taskFn, delayMs);
      scheduler.cancelAll();
      jest.advanceTimersByTime(delayMs);

      // Assert
      expect(taskFn).not.toBeCalled();
    });

    test("should prevent recurring tasks from executing", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();
      const intervalMs = 1000;

      // Act
      scheduler.scheduleRecurring("recurringTaskToCancel", taskFn, intervalMs);
      scheduler.cancelAll();
      jest.advanceTimersByTime(intervalMs * 3);

      // Assert
      expect(taskFn).not.toBeCalled();
    });
  });

  describe("edge cases", () => {
    test("scheduling task with zero delay executes immediately", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();

      // Act
      scheduler.schedule("immediateTask", taskFn, 0);
      jest.advanceTimersByTime(0);

      // Assert
      expect(taskFn).toBeCalled();
    });

    test("multiple tasks scheduled at same time execute correctly", () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn1 = jest.fn();
      const taskFn2 = jest.fn();
      const delayMs = 1000;

      // Act
      scheduler.schedule("task1", taskFn1, delayMs);
      scheduler.schedule("task2", taskFn2, delayMs);
      jest.advanceTimersByTime(delayMs);

      // Assert
      expect(taskFn1).toHaveBeenCalledTimes(1);
      expect(taskFn2).toHaveBeenCalledTimes(1);
    });
  });
});
