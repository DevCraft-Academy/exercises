// Director

// Import the builder and configuration classes
import PCBuilder from './PCBuilder.js';
import PCConfiguration from './PCConfiguration.js';

// Example 1: A gaming PC
const gamingPC = new PCBuilder()
  .setCPU("Intel Core i9-14900K")
  .setGPU("NVIDIA RTX 4090")
  .setRAM("32GB DDR5")
  .setStorage("2TB NVMe SSD")
  .addComponent("Power Supply", "850W Gold")
  .addComponent("Case", "Lian Li O11 Dynamic")
  .build();

// Display the gaming PC configuration
gamingPC.printConfiguration();

// Example 2: A budget office PC
const officePC = new PCBuilder()
  .setCPU("AMD Ryzen 5 5600G")
  .setGPU("Integrated Graphics")
  .setRAM("16GB DDR4")
  .setStorage("512GB SSD")
  .addComponent("Power Supply", "500W Bronze")
  .addComponent("Case", "Mini Tower")
  .build();

// Display the office PC configuration
officePC.printConfiguration();
