import { Task } from './Task.js';

/**
 * child class TimedTask
 * parent: class Task
 * 
 * expands attributes of class Task with the attributes startTime and endTime
 * Note: Not implemented in frontend
 */

export class TimedTask extends Task {
  constructor(title, description, startTime, endTime) {
    super(title, description);
    this.startTime = startTime;
    this.endTime = endTime;
  }

   // logs all the details of the Task class including startTime and endTime from TimedTask child class in console
  displayDetails() {
    super.displayDetails();
    console.log(`StartingTime: ${this.startTime} – EndTime: ${this.endTime}`);
  }
}
