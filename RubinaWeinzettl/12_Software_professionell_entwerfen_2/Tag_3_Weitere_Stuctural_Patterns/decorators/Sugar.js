import AddonDecorator from "./AddonDecorator.js";

// Concrete decorator: Sugar
class Sugar extends AddonDecorator {
    getDescription() {
      return this.beverage.getDescription() + ", Sugar";
    }

    cost() {
      return this.beverage.cost() + 0.2;
    }
}

export default Sugar;
