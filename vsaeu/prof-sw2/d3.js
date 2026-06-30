// Die abstrakte Komponente
class Beverage {
  constructor() {
    this.description = "Unbekanntes Getränk";
  }

  getDescription() {
    return this.description;
  }

  cost() {
    throw new Error(
      "Diese Methode muss in der Unterklasse implementiert werden."
    );
  }
}

// Konkrete Komponenten
class Coffee extends Beverage {
  constructor() {
    super();
    this.description = "Kaffee";
  }

  cost() {
    return 1.99;
  }
}

class Tea extends Beverage {
  constructor() {
    super();
    this.description = "Tee";
  }

  cost() {
    return 1.49;
  }
}

// Der abstrakte Decorator für Zusätze
class AddonDecorator extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return this.beverage.getDescription(); // Wird in Unterklassen überschrieben
  }
}

// Konkrete Decorator
class Milk extends AddonDecorator {
  constructor(beverage) {
    super(beverage);
  }

  getDescription() {
    return this.beverage.getDescription() + ", Milch";
  }

  cost() {
    return this.beverage.cost() + 0.2;
  }
}

class Sugar extends AddonDecorator {
  constructor(beverage) {
    super(beverage);
  }

  getDescription() {
    return this.beverage.getDescription() + ", Zucker";
  }

  cost() {
    return this.beverage.cost() + 0.1;
  }
}

// Benutzung
let myCoffee = new Coffee();
console.log(`${myCoffee.getDescription()} kostet $${myCoffee.cost()}`);

myCoffee = new Milk(myCoffee);
console.log(`${myCoffee.getDescription()} kostet $${myCoffee.cost()}`);

myCoffee = new Sugar(myCoffee);
console.log(`${myCoffee.getDescription()} kostet $${myCoffee.cost()}`);

let myTea = new Tea();
myTea = new Sugar(myTea);
console.log(`${myTea.getDescription()} kostet $${myTea.cost()}`);