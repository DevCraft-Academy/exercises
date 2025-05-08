// Abstract class that defines the interface for all beverages
class Beverage {
    getDescription() {
      throw new Error("getDescription() must be implemented.");
    }

    cost() {
      throw new Error("cost() must be implemented.");
    }
}

export default Beverage;
