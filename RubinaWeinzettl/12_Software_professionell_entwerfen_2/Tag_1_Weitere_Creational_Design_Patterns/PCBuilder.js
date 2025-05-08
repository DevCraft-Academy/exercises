// Builder and Concrete Builder

// This class implements the Builder Pattern.
// It provides methods to set individual PC components,
// and a build() method that returns the final PC configuration object.
// Note: Formal Interfaces don't exist in JS, but the method structure is defined according to the logic of an interface

class PCBuilder {
  constructor() {
    // Initialize all components with null or default values
    this.cpu = null;
    this.gpu = null;
    this.ram = null;
    this.storage = null;

    // For future-proofing: add a flexible components object
    this.additionalComponents = {};
  }

  // Method to set the CPU
  setCPU(cpu) {
    this.cpu = cpu;
    return this; // Enables method chaining
  }

  // Method to set the GPU
  setGPU(gpu) {
    this.gpu = gpu;
    return this;
  }

  // Method to set the RAM
  setRAM(ram) {
    this.ram = ram;
    return this;
  }

  // Method to set the Storage
  setStorage(storage) {
    this.storage = storage;
    return this;
  }

  // Flexible method to add any additional component (like PSU, Case, etc.)
  addComponent(name, value) {
    this.additionalComponents[name] = value;
    return this;
  }

  // Final method to return the complete configuration
  build() {
    return new PCConfiguration(
      this.cpu,
      this.gpu,
      this.ram,
      this.storage,
      this.additionalComponents
    );
  }
}

// Export the class for use in other files
export default PCBuilder;
