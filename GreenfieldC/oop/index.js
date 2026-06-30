class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this._isCompleted = false;
    }

    // Getter und Setter für isCompleted (Kapselung)
    get isCompleted() {
        return this._isCompleted;
    }

    set isCompleted(value) {
        this._isCompleted = !!value;
    }

    // Methode zum Umschalten des Status
    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }

    // Details anzeigen
    displayDetails() {
        console.log(`Titel: ${this.title}`);
        console.log(`Beschreibung: ${this.description}`);
        console.log(`Erledigt: ${this.isCompleted ? "Ja" : "Nein"}`);
    }
}

// Abgeleitete Klasse TimedTask
class TimedTask extends Task {
    constructor(title, description, startTime, endTime) {
        super(title, description);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Details inkl. Zeit anzeigen
    displayDetails() {
        super.displayDetails();
        console.log(`Start: ${this.startTime}`);
        console.log(`Ende: ${this.endTime}`);
    }
}

// Pure Function zum Hinzufügen einer Aufgabe (immutable)
function addTask(tasks, taskDetails) {
    const newTask = new Task(taskDetails.title, taskDetails.description);
    return [...tasks, newTask];
}

// Beispiel-Nutzung
let tasks = [];
tasks = addTask(tasks, { title: "Einkaufen", description: "Milch und Brot kaufen" });
tasks = addTask(tasks, { title: "Hausaufgaben", description: "Matheaufgaben lösen" });

const timedTask = new TimedTask("Joggen", "30 Minuten laufen", "07:00", "07:30");
tasks = [...tasks, timedTask];

// Aufgaben anzeigen
tasks.forEach(task => task.displayDetails());

// Status ändern und erneut anzeigen
tasks[0].toggleCompletion();
console.log("\nNach dem Umschalten:");
tasks[0].displayDetails();