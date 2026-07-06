// Product

// This class represents the final product built by PCBuilder.
// It stores all the selected components.

class PCConfiguration {
  constructor(cpu, gpu, ram, storage, additionalComponents = {}) {
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.storage = storage;
    this.additionalComponents = additionalComponents;
  }

  // Method to display the full configuration in a readable format
  printConfiguration() {
    console.log("=== PC Configuration ===");
    console.log(`CPU: ${this.cpu}`);
    console.log(`GPU: ${this.gpu}`);
    console.log(`RAM: ${this.ram}`);
    console.log(`Storage: ${this.storage}`);

    // If there are additional components, print them too
    if (Object.keys(this.additionalComponents).length > 0) {
      console.log("--- Additional Components ---");
      for (const [name, value] of Object.entries(this.additionalComponents)) {
        console.log(`${name}: ${value}`);
      }
    }
    console.log("===========================");
  }
}

export default PCConfiguration;
