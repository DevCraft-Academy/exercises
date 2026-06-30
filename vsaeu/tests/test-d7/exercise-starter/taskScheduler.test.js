const { TaskScheduler } = require('./taskScheduler');

describe('TaskScheduler', () => {
  // TODO: Setup Fake Timers in beforeEach
  // Tip: jest.useFakeTimers()

  // TODO: Cleanup in afterEach
  // Tip: jest.useRealTimers()
    beforeEach(() => {
    jest.useFakeTimers();  // Zeit wird kontrollierbar
  });

  afterEach(() => {
    jest.useRealTimers();  // Cleanup für andere Tests
  });

  describe('schedule()', () => {
    test('executes task after correct delay', () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const mockFn = jest.fn();

      scheduler.schedule('testTask', mockFn, 5000);

      // Act & Assert - Before delay
      expect(mockFn).not.toHaveBeenCalled();
      expect(scheduler.getExecutedTasks()).toEqual([]);

            jest.advanceTimersByTime(2500);
      expect(mockFn).not.toHaveBeenCalled();

      // Act - Fast-forward time
      jest.advanceTimersByTime(2500);

      // Assert - After delay
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(scheduler.getExecutedTasks()).toEqual(['testTask']);
    });

    test('tracks executed tasks', () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const mockFn = jest.fn();

      scheduler.schedule('task1', mockFn, 3000);

      // Act
      jest.advanceTimersByTime(3000);

      // Assert
      expect(scheduler.getExecutedTasks()).toContain('task1');
    });

     test('executes multiple tasks in correct order', () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const task1 = jest.fn();
      const task2 = jest.fn();

      scheduler.schedule('task-1', task1, 2000);
      scheduler.schedule('task-2', task2, 5000);

      jest.advanceTimersByTime(2000);
      expect(task1).toHaveBeenCalledTimes(1);
      expect(task2).not.toHaveBeenCalled();

      jest.advanceTimersByTime(3000);
      expect(task1).toHaveBeenCalledTimes(1); // Immer noch nur 1x
      expect(task2).toHaveBeenCalledTimes(1); // Jetzt auch 1x
    });
  });

  describe('scheduleRecurring()', () => {
    test('executes task multiple times at correct interval', () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const mockFn = jest.fn();
      const intervalMs = 2000;

      scheduler.scheduleRecurring('recurringTask', mockFn, intervalMs);

      // Act & Assert - Before first interval
      expect(mockFn).not.toHaveBeenCalled();

      // Act - Fast-forward to first execution
      jest.advanceTimersByTime(intervalMs);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(scheduler.getExecutedTasks()).toEqual(['recurringTask']);

      // Act - Fast-forward to second execution
      jest.advanceTimersByTime(intervalMs);
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(scheduler.getExecutedTasks()).toEqual(['recurringTask', 'recurringTask']);

      // Act - Fast-forward to third execution
      jest.advanceTimersByTime(intervalMs);
      expect(mockFn).toHaveBeenCalledTimes(3);
      expect(scheduler.getExecutedTasks()).toEqual(['recurringTask', 'recurringTask', 'recurringTask']);
    });
  });

  describe('cancelAll()', () => {
    // TODO: Test that cancelAll() prevents tasks from executing
        test('prevents scheduled tasks from executing', () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();

      scheduler.schedule('test-task', taskFn, 5000);

      // Act - Cancel before task executes
      scheduler.cancelAll();
      jest.advanceTimersByTime(10000);

      // Assert - Task sollte NIE ausgeführt werden
      expect(taskFn).not.toHaveBeenCalled();
    });

    describe('Edge Cases', () => {
    test('handles zero delay', () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();

      // Act
      scheduler.schedule('immediate', taskFn, 0);
      jest.advanceTimersByTime(0);

      // Assert - Task läuft sofort
      expect(taskFn).toHaveBeenCalledTimes(1);
    });

    test('handles multiple concurrent tasks', () => {
      // Arrange
      const scheduler = new TaskScheduler();
      const taskA = jest.fn();
      const taskB = jest.fn();
      const taskC = jest.fn();

      // Act - Alle zur gleichen Zeit geplant
      scheduler.schedule('task-a', taskA, 5000);
      scheduler.schedule('task-b', taskB, 5000);
      scheduler.schedule('task-c', taskC, 5000);

      jest.advanceTimersByTime(5000);

      // Assert - Alle laufen
      expect(taskA).toHaveBeenCalledTimes(1);
      expect(taskB).toHaveBeenCalledTimes(1);
      expect(taskC).toHaveBeenCalledTimes(1);
    });
  });
  });
});