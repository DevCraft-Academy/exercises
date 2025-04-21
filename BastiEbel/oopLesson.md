class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this._isCompleted = false;
  }

  // Getter und Setter
  get isCompleted() {
    return this._isCompleted;
  }

  set isCompleted(value) {
    if (typeof value === "boolean") {
      this._isCompleted = value;
    } else {
      throw new Error("isCompleted must be a boolean");
    }
  }

  // Methode zum Umschalten des Status
  toggleCompletion() {
    this._isCompleted = !this._isCompleted;
  }

  // Methode zum Anzeigen der Details
  displayDetails() {
    console.log(
      `Title: ${this.title}, Description: ${this.description}, Completed: ${this._isCompleted}`
    );
  }
}

// Abgeleitete Klasse TimedTask
class TimedTask extends Task {
  constructor(title, description, startTime, endTime) {
    super(title, description); // Aufruf des Konstruktors der Basisklasse
    this.startTime = startTime;
    this.endTime = endTime;
  }

  // Überschreiben der displayDetails-Methode
  displayDetails() {
    super.displayDetails(); // Aufruf der Basisklassen-Methode
    console.log(`Start Time: ${this.startTime}, End Time: ${this.endTime}`);
  }
}

function addTask(tasks, taskDetails) {
  const newTask = new Task(taskDetails.title, taskDetails.description);
  return [...tasks, newTask];
}

const tasks = []; // Aufgabenliste (immutable)

// Neue Aufgaben hinzufügen
const updatedTasks1 = addTask(tasks, { title: "Task 1", description: "Learn OOP" });
const updatedTasks2 = addTask(updatedTasks1, { title: "Task 2", description: "Learn FP" });

// Details der Aufgaben anzeigen
updatedTasks2.forEach((task) => task.displayDetails());

// TimedTask erstellen und anzeigen
const timedTask = new TimedTask(
  "Timed Task 1",
  "Complete project",
  "2025-04-21 10:00",
  "2025-04-21 12:00"
);
timedTask.displayDetails();

// Status einer Aufgabe ändern
timedTask.toggleCompletion();
console.log(`Timed Task Completed: ${timedTask.isCompleted}
