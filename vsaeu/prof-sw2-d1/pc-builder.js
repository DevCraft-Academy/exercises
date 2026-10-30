class PC {
  constructor() {
    this.cpu = null;
    this.gpu = null;
    this.ram = null;
    this.storage = null;
  }

  toString() {
    return `PC Configuration:\nCPU: ${this.cpu}\nGPU: ${this.gpu}\nRAM: ${this.ram}\nStorage: ${this.storage}`;
  }
}

class PCBuilder {
  constructor() {
    this.pc = new PC();
  }

  setCPU(cpu) {
    this.pc.cpu = cpu;
    return this;
  }

  setGPU(gpu) {
    this.pc.gpu = gpu;
    return this;
  }

  setRAM(ram) {
    this.pc.ram = ram;
    return this;
  }

  setStorage(storage) {
    this.pc.storage = storage;
    return this;
  }

  build() {
    return this.pc;
  }
}

// Beispiel für die Verwendung des Builders
const gamingPC = new PCBuilder()
  .setCPU('Intel Core i9')
  .setGPU('NVIDIA RTX 3080')
  .setRAM('32GB DDR4')
  .setStorage('1TB NVMe SSD')
  .build();

console.log(gamingPC.toString());