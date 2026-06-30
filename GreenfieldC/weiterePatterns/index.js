// Basis-Klasse für Getränke
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
        return 2.0;
    }
}

class Tea extends Beverage {
    getDescription() {
        return "Tee";
    }
    cost() {
        return 1.5;
    }
}

// Abstrakter Dekorierer für Zutaten
class IngredientDecorator extends Beverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
}

// Konkrete Zutaten
class Milk extends IngredientDecorator {
    getDescription() {
        return this.beverage.getDescription() + ", Milch";
    }
    cost() {
        return this.beverage.cost() + 0.3;
    }
}

class Sugar extends IngredientDecorator {
    getDescription() {
        return this.beverage.getDescription() + ", Zucker";
    }
    cost() {
        return this.beverage.cost() + 0.2;
    }
}

class ChocolateSyrup extends IngredientDecorator {
    getDescription() {
        return this.beverage.getDescription() + ", Schokoladensirup";
    }
    cost() {
        return this.beverage.cost() + 0.5;
    }
}

class Lemon extends IngredientDecorator {
    getDescription() {
        return this.beverage.getDescription() + ", Zitrone";
    }
    cost() {
        return this.beverage.cost() + 0.4;
    }
}

// Beispiel für die flexible Kombination
// Kaffee mit Milch und Zucker
let myDrink = new Coffee();
myDrink = new Milk(myDrink);
myDrink = new Sugar(myDrink);
console.log(myDrink.getDescription() + " kostet " + myDrink.cost().toFixed(2) + "€");

// Tee mit Zitrone und Zucker
let tea = new Tea();
tea = new Lemon(tea);
tea = new Sugar(tea);
console.log(tea.getDescription() + " kostet " + tea.cost().toFixed(2) + "€");
