// Aufgabenverwaltungssystem - OOP und FP Integration

// 1. Klassen und Vererbung
class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this._isCompleted = false; // Private property für Kapselung
    }

    // Kapselung: Getter und Setter
    get isCompleted() {
        return this._isCompleted;
    }

    set isCompleted(value) {
        this._isCompleted = Boolean(value);
    }

    // Methoden
    toggleCompletion() {
        this._isCompleted = !this._isCompleted;
    }

    displayDetails() {
        console.log(`Task: ${this.title}`);
        console.log(`Description: ${this.description}`);
        console.log(`Status: ${this._isCompleted ? 'Completed' : 'Pending'}`);
        console.log('---');
    }
}

// Vererbung: TimedTask erbt von Task
class TimedTask extends Task {
    constructor(title, description, startTime, endTime) {
        super(title, description);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    displayDetails() {
        super.displayDetails();
        console.log(`Start Time: ${this.startTime}`);
        console.log(`End Time: ${this.endTime}`);
        console.log('---');
    }
}

// 2. Pure Function - Funktionale Programmierung
function addTask(taskArray, taskDetails) {
    // Neue Task erstellen
    const newTask = taskDetails.startTime && taskDetails.endTime 
        ? new TimedTask(taskDetails.title, taskDetails.description, taskDetails.startTime, taskDetails.endTime)
        : new Task(taskDetails.title, taskDetails.description);
    
    // Neues Array zurückgeben (immutable)
    return [...taskArray, newTask];
}

// 3. Demo und Tests
console.log('=== Aufgabenverwaltungssystem Demo ===\n');

// Initialisierung
let tasks = [];

// Tasks hinzufügen (funktional)
tasks = addTask(tasks, {
    title: 'Code reviewen',
    description: 'Pull Request überprüfen'
});

tasks = addTask(tasks, {
    title: 'Meeting vorbereiten',
    description: 'Agenda und Materialien bereitstellen',
    startTime: '09:00',
    endTime: '10:00'
});

// Task-Status ändern (objektorientiert)
tasks[0].toggleCompletion();

// Ergebnisse anzeigen
console.log('Alle Tasks:');
tasks.forEach((task, index) => {
    console.log(`Task ${index + 1}:`);
    task.displayDetails();
});

// Kapselung demonstrieren
console.log('=== Kapselung Demo ===');
const testTask = new Task('Test Task', 'Test Description');
console.log('Initial Status:', testTask.isCompleted);
testTask.isCompleted = true; // Setter verwenden
console.log('Nach Setter:', testTask.isCompleted);
testTask.toggleCompletion(); // Toggle zurück
console.log('Nach Toggle:', testTask.isCompleted);