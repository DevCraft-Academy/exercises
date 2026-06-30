import Beverage from "../beverages/Beverage.js";

// Abstract decorator class for all addons
class AddonDecorator extends Beverage {
    constructor(beverage) {
      super();
      this.beverage = beverage;
    }

    getDescription() {
      throw new Error("getDescription() must be implemented by decorator.");
    }

    cost() {
      throw new Error("cost() must be implemented by decorator.");
    }
}

export default AddonDecorator;
