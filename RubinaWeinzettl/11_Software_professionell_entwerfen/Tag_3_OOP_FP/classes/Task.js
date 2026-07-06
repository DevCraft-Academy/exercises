/**
 * class Task
 * contains basic attributes for task list
 * and getters and setters for status of task completition
 */

export class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this._isCompleted = false;
  }

  // getter for is_Completed - shows status of task completition
    get isCompleted() {
    return this._isCompleted;
  }

  // setter for isCompleted
  // sets task complete / incomplete
  set isCompleted(value) {
    if (typeof value === 'boolean') {
      this._isCompleted = value;
    } else {
      throw new Error("isCompleted has to be of type boolean");
    }
  }
 
  // toggle function to change completition status
  toggleCompletion() {
    this._isCompleted = !this._isCompleted;
  }
  
  // logs completition status in console
  displayDetails() {
    console.log(`${this.title}\n ${this.description}\n Erledigt: ${this._isCompleted}`);
  }
}
