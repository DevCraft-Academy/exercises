// Basisklasse für Getränke
class Beverage {
  getDescription() {
    return "Unbekanntes Getränk";
  }

  cost() {
    return 0;
  }
}

// Konkrete Getränke
class Coffee extends Beverage {
  getDescription() {
    return "Kaffee";
  }

  cost() {
    return 2.0; // Beispielpreis
  }
}

class Tea extends Beverage {
  getDescription() {
    return "Tee";
  }

  cost() {
    return 1.5; // Beispielpreis
  }
}

// Decorator-Klasse für Zutaten
class IngredientDecorator extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return this.beverage.getDescription();
  }

  cost() {
    return this.beverage.cost();
  }
}

// Konkrete Zutaten als Decorators
class Milk extends IngredientDecorator {
  getDescription() {
    return this.beverage.getDescription() + ", Milch";
  }

  cost() {
    return this.beverage.cost() + 0.5; // Preis für Milch
  }
}

class Sugar extends IngredientDecorator {
  getDescription() {
    return this.beverage.getDescription() + ", Zucker";
  }

  cost() {
    return this.beverage.cost() + 0.2; // Preis für Zucker
  }
}

class ChocolateSyrup extends IngredientDecorator {
  getDescription() {
    return this.beverage.getDescription() + ", Schokoladensirup";
  }

  cost() {
    return this.beverage.cost() + 0.7; // Preis für Schokoladensirup
  }
}

let meinKaffee = new Coffee();
meinKaffee = new Milk(meinKaffee);
meinKaffee = new Sugar(meinKaffee);

console.log(meinKaffee.getDescription());
console.log("Preis: €" + meinKaffee.cost().toFixed(2));

// Beispiel: Tee mit Schokoladensirup
let meinTee = new Tea();
meinTee = new ChocolateSyrup(meinTee);

console.log(meinTee.getDescription());
console.log("Preis: €" + meinTee.cost().toFixed(2));
