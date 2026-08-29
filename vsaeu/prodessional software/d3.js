class Task {
  constructor(title, description, isCompleted) {
    this.title = this.title;
    this.description = description; // duration in hours
    this.isCompleted = isCompleted;
  }

  toggleCompletion(task) {
    task.isCompleted = !task.isCompleted;
  }

  displayDetails(task) {
    console.log(`Title: ${task.title}`);
    console.log(`Description: ${task.description}`);
    console.log(`Completed: ${task.isCompleted}`);
  }

  getIsCompleted(task) {
    return task.isCompleted;
  }

  setIsCompleted(task, status) {
    task.isCompleted = status;
  }

  addTask(taskList, task) {
    const newTaskList = [...taskList, task];
    return newTaskList;
  }
}

class TimedTask extends Task {
  constructor(startTime, endTime) {
    super(title, description, isCompleted);
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
