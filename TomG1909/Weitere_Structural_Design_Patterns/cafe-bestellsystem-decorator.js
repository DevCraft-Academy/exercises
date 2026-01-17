
class Beverage {
    constructor() {
        this.description = "Unbekanntes Getränk";
    }

    getDescription() {
        return this.description;
    }

    cost() {
        throw new Error("cost() Methode muss implementiert werden");
    }
}

/**
 * 
 * Basis-Decorator für Getränkezusätze
 */
class BeverageDecorator extends Beverage {
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

// ============= KONKRETE GETRÄNKE =============

class Coffee extends Beverage {
    constructor() {
        super();
        this.description = "Kaffee";
    }

    cost() {
        return 2.50;
    }
}

class Tea extends Beverage {
    constructor() {
        super();
        this.description = "Tee";
    }

    cost() {
        return 2.00;
    }
}

class Espresso extends Beverage {
    constructor() {
        super();
        this.description = "Espresso";
    }

    cost() {
        return 1.80;
    }
}

// ============= ZUTATEN-DECORATORS =============

class Milk extends BeverageDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ", Milch";
    }

    cost() {
        return this.beverage.cost() + 0.60;
    }
}

class Sugar extends BeverageDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ", Zucker";
    }

    cost() {
        return this.beverage.cost() + 0.20;
    }
}


class Lemon extends BeverageDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ", Zitrone";
    }

    cost() {
        return this.beverage.cost() + 0.30;
    }
}


// ============= DEMO & TESTS =============

console.log('=== Café Bestellsystem - Decorator Pattern ===\n');

// Einfache Getränke
console.log('--- Einfache Getränke ---');
let kaffee = new Coffee();
console.log(`${kaffee.getDescription()}: €${kaffee.cost().toFixed(2)}`);

let tee = new Tea();
console.log(`${tee.getDescription()}: €${tee.cost().toFixed(2)}`);

let espresso = new Espresso();
console.log(`${espresso.getDescription()}: €${espresso.cost().toFixed(2)}`);

// Getränke mit Zutaten
console.log('\n--- Getränke mit Zutaten ---');

// Kaffee mit Milch und Zucker
let milchkaffee = new Coffee();
milchkaffee = new Milk(milchkaffee);
milchkaffee = new Sugar(milchkaffee);
console.log(`${milchkaffee.getDescription()}: €${milchkaffee.cost().toFixed(2)}`);

// Tee mit Zitrone
let zitronentee = new Tea();
zitronentee = new Lemon(zitronentee);
console.log(`${zitronentee.getDescription()}: €${zitronentee.cost().toFixed(2)}`);

// Luxus-Espresso mit allem
let luxusEspresso = new Espresso();
luxusEspresso = new Milk(luxusEspresso);
luxusEspresso = new Sugar(luxusEspresso);
console.log(`Luxus-${luxusEspresso.getDescription()}: €${luxusEspresso.cost().toFixed(2)}`);

console.log('\n--- Demonstration der Flexibilität ---');

// Zeige, dass Zutaten mehrfach hinzugefügt werden können
let superSüßerTee = new Tea();
superSüßerTee = new Sugar(superSüßerTee);
superSüßerTee = new Sugar(superSüßerTee);  // Doppelter Zucker
superSüßerTee = new Sugar(superSüßerTee);  // Dreifacher Zucker!
console.log(`${superSüßerTee.getDescription()}: €${superSüßerTee.cost().toFixed(2)}`);
