class Todo extends Backbone.Model {
  /**Legacy Code in TodoMVC */
  toggleAll() {
    var completed = this.allCheckbox.checked;

    this.todos.each(function (todo) {
      todo.save({
        completed: completed,
      });
    });
  }

  /** Probleme:
   *  Schlechter Name completed: Das klingt wie ein Status, ist aber eigentlich ein „Flag“ aus einem UI-Checkbox-Wert.
   * Inline-Logik: Die Funktion macht mehr als nötig (liest DOM-State und setzt Model-Werte).
   * Fehlende Abstraktion: UI-Logik (this.allCheckbox.checked) und Business-Logik (Ändern der Models) sind direkt gekoppelt.
   **/

  /**Refactored Code */

  toggleAll() {
    const isMarkedComplete = this.allCheckbox.checked;
    this._updateAllTodosCompletion(isMarkedComplete);
  }

  _updateAllTodosCompletion(shouldComplete) {
    this.todos.each(function (todo) {
      todo.save({ completed: shouldComplete });
    });
  }
  /** Probleme:
   *  Bessere Namensgebung: isMarkedComplete ist klarer als completed.
   *  Abstraktion: Die Logik zum Aktualisieren aller Todos ist in eine separate Methode ausgelagert.
   *  Single Responsibility Principle: Jede Methode hat jetzt eine klar definierte Aufgabe.
   **/
}
