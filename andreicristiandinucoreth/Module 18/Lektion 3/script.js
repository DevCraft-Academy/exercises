// Solution for the given scenario is the use of the Decorator Pattern

// Abstract Beverage component

class Beverage {
  constructor() {
    this.description = "Unknown";
  }

  getDescription() {
    return this.description;
  }

  cost() {
    throw new Error("This method must be overridden!");
  }
}

// Concrete Beverage components

class Espresso extends Beverage {
  constructor() {
    super();
    this.description = "Espresso";
  }
  cost() {
    return 3.0;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = "House Blend Coffee";
  }
  cost() {
    return 1.89;
  }
}

// Abstract Decorator class

class ModifierDecorator extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return this.beverage.getDescription();
  }

  // we don't implement cost() here, forcing subclasses to do so
}

// Concrete Decorators

class Sugar extends ModifierDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return this.beverage.getDescription() + ", Sugar";
  }
  cost() {
    return this.beverage.cost() + 0.2;
  }
}

class OatMilk extends ModifierDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return this.beverage.getDescription() + ", Oat Milk";
  }
  cost() {
    return this.beverage.cost() + 1.0;
  }
}

let myDrink = new Espresso();
console.log(`${myDrink.getDescription()} $${myDrink.cost().toFixed(2)}`);

myDrink = new Sugar(myDrink);
console.log(`${myDrink.getDescription()} $${myDrink.cost().toFixed(2)}`);

myDrink = new OatMilk(myDrink);
console.log(`${myDrink.getDescription()} $${myDrink.cost().toFixed(2)}`);

let myDrink2 = new HouseBlend();
myDrink2 = new OatMilk(myDrink2);
console.log(`${myDrink2.getDescription()} $${myDrink2.cost().toFixed(2)}`);
