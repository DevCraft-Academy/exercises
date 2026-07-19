class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  createTask({ title, description, priority = 'medium' }) {
    if (!title || title.trim() === '') {
      throw new Error('Title is required');
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      throw new Error('Invalid priority level');
    }

    const task = {
      id: String(this.nextId++),
      title: title.trim(),
      description: description?.trim() || '',
      status: 'pending',
      priority,
      createdAt: Date.now(),
      completedAt: null
    };

    this.tasks.push(task);
    return task;
  }

  getTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  completeTask(id) {
    const task = this.getTask(id);

    if (task.status === 'completed') {
      throw new Error('Task is already completed');
    }

    task.status = 'completed';
    task.completedAt = Date.now();
    return task;
  }

  updatePriority(id, priority) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      throw new Error('Invalid priority level');
    }

    const task = this.getTask(id);
    task.priority = priority;
    return task;
  }

  listTasks(filters = {}) {
    let filtered = [...this.tasks];

    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters.priority) {
      filtered = filtered.filter(t => t.priority === filters.priority);
    }

    return filtered;
  }
}

module.exports = { TaskManager };
