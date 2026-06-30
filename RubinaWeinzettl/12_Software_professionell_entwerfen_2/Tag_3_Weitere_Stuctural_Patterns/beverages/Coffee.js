import Beverage from './Beverage.js';

// Concrete Beverage: Coffee
class Coffee extends Beverage {
    getDescription() {
      return "Coffee";
    }

    cost() {
      return 2.5; // Base price of coffee
    }
}

export default Coffee;
