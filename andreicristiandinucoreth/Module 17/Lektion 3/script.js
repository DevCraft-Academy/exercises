class Task {
  constructor(title, description, isCompleted = false) {
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
  }

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }

  displayDetails() {
    console.log(
      `Title: ${this.title}, Description: ${this.description}, Completed: ${this.isCompleted}`
    );
  }

  getIsCompleted() {
    return this.isCompleted;
  }

  setIsCompleted(status) {
    this.isCompleted = status;
  }
}

class TimedTask extends Task {
  constructor(title, description, isCompleted = false, startTime, endTime) {
    super(title, description, isCompleted);
    this.startTime = startTime;
    this.endTime = endTime;
  }

  displayDetails() {
    super.displayDetails();
    console.log(`Start Time: ${this.startTime}, End Time: ${this.endTime}`);
  }
}

function addTask(
  taskList,
  title,
  description,
  isTimed = false,
  startTime = null,
  endTime = null
) {
  let newTask;
  if (isTimed) {
    newTask = new TimedTask(title, description, false, startTime, endTime);
  } else {
    newTask = new Task(title, description);
  }
  return [...taskList, newTask];
}

// Test functionality

let tasks = [];
tasks = addTask(tasks, "Buy groceries", "Milk, Bread, Eggs");
tasks = addTask(
  tasks,
  "Meeting with team",
  "Discuss project updates",
  true,
  "13:00",
  "14:00"
);

tasks[1].toggleCompletion();

tasks.forEach((task) => task.displayDetails());
