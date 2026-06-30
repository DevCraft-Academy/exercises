import Beverage from './Beverage.js';

// Concrete Beverage: Tea
class Tea extends Beverage {
    getDescription() {
      return "Tea";
    }

    cost() {
      return 2.0; // Base price of tea
    }
}

export default Tea;
