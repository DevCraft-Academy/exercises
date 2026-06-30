class PCSystem {
  constructor() {
    this.cpu = null;
    this.gpu = null;
    this.ram = null;
    this.storage = null;
  }

  getConfiguration() {
    return `Configuration: \n - CPU: ${this.cpu}, \n - GPU: ${this.gpu}, \n - RAM: ${this.ram}, \n - Storage: ${this.storage}`;
  }
}

class PCSystemBuilder {
  constructor() {
    this.pcSystem = new PCSystem();
  }

  setCPU(cpu) {
    this.pcSystem.cpu = cpu;
    return this;
  }

  setGPU(gpu) {
    this.pcSystem.gpu = gpu;
    return this;
  }

  setRAM(ram) {
    this.pcSystem.ram = ram;
    return this;
  }

  setStorage(storage) {
    this.pcSystem.storage = storage;
    return this;
  }

  build() {
    return this.pcSystem;
  }
}

const gamingPC = new PCSystemBuilder()
  .setCPU("Intel Core i9")
  .setGPU("NVIDIA RTX 5080")
  .setRAM("64GB")
  .setStorage("2TB SSD")
  .build();

console.log(gamingPC.getConfiguration());
