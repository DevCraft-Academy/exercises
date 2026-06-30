class Beverage{

constructor(){

    this.description = "Kein definiertes Geränk"
}

getDescription() {
    return this.description;
  }

  cost() {
    throw new Error(
      "Hier nicht möglich"
    );
  }

}




class Water extends Beverage {

constructor() {
super();
this.description = 'Wasser'
}


cost() {
    return 0.0;
  }
}

class MineralWater extends Beverage {

    constructor() {
    super();
    this.description = 'Mineral Wasser'
    }
    
    
    cost() {
        return 1.5;
      }
    }



    class Added extends Beverage {
        constructor(beverage) {
            super();
            this.beverage = beverage;
          }
        
          getDescription() {
            return this.beverage.getDescription(); // Wird in Unterklassen überschrieben
          }
    }


    class Lemon extends Added {
        constructor(beverage) {
          super(beverage);
        }
      
        getDescription() {
          return this.beverage.getDescription() + "mit Zitrone";
        }
      
        cost() {
          return this.beverage.cost() + 0.2;
        }
      }
      
      class CO2 extends Added {
        constructor(beverage) {
          super(beverage);
        }
      
        getDescription() {
          return this.beverage.getDescription() + "mit Kohlensäure";
        }
      
        cost() {
          return this.beverage.cost() + 0.0;
        }
      }

let water = new Water();
console.log(`${water.getDescription()} kostet $${water.cost()}`);

water = new Lemon(water);
console.log(`${water.getDescription()} kostet $${water.cost()}`);

water = new CO2(water);
console.log(`${water.getDescription()} kostet $${water.cost()}`);

let mineralwater = new MineralWater();
mineralwater = new CO2(mineralwater);
console.log(`${mineralwater.getDescription()} kostet $${mineralwater.cost()}`);