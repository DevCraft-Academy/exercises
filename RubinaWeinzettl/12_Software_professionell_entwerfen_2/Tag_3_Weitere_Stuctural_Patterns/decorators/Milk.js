import AddonDecorator from "./AddonDecorator.js";

// Concrete decorator: Milk
class Milk extends AddonDecorator {
    getDescription() {
      return this.beverage.getDescription() + ", Milk";
    }

    cost() {
      return this.beverage.cost() + 0.5;
    }
}

export default Milk;
