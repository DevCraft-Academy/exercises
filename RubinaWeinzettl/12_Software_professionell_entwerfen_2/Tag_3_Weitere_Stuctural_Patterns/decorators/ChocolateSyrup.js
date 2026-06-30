import AddonDecorator from "./AddonDecorator.js";

// Concrete decorator: Chocolate Syrup
class ChocolateSyrup extends AddonDecorator {
    getDescription() {
      return this.beverage.getDescription() + ", Chocolate Syrup";
    }

    cost() {
      return this.beverage.cost() + 0.7;
    }
}

export default ChocolateSyrup;
