import { Task } from './Task.js';

/**
 * child class TimedTask
 * parent: class Task
 * 
 * expands attributes of class Task with the attributes startTime and endTime
 */

export class TimedTask extends Task {
  constructor(title, description, startTime, endTime) {
    super(title, description);
    this.startTime = startTime;
    this.endTime = endTime;
  }

   // logs startTime and endTime in console
  displayDetails() {
    super.displayDetails();
    console.log(`StartingTime: ${this.startTime} – EndTime: ${this.endTime}`);
  }
}
