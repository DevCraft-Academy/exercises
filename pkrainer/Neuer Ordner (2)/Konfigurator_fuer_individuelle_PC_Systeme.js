class PC {
  constructor() {
    this.cpu = null;
    this.gpu = null;
    this.ram = null;
    this.storage = null;
	this.cooling = null;
	this.pccase = null;
	this.psu = null
  }

  toString() {
    return `PC Configuration:\nCPU: ${this.cpu}\nGPU: ${this.gpu}\nRAM: ${this.ram}\nStorage: ${this.storage}\nCooling: ${this.cooling}\npccase: ${this.pccase}\nPSU: ${this.PSU}`;
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
  
  }
    setCooling(cooling) {
    this.pc.cooling = cooling;
    return this;
  }
  
    setPcCase(pccase) {
    this.pc.pccase = pccase;
    return this;
  }
  
    setPSU(psu) {
    this.pc.psu = psu;
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
  .setCooling('Aio Cooling')
  .setPcCase('Gaming Case')
  .setPSU('1000w')
  .build();

console.log(gamingPC.toString());

const highGamingPC = new PCBuilder()
  .setCPU('Intel Core i9 14900KS')
  .setGPU('NVIDIA RTX 4090 OC')
  .setRAM('128GB DDR5')
  .setStorage('4TB NVMe SSD')
  .setCooling('Full Custom Water cooling')
  .setPcCase('Corsair 1000D')
  .setPSU('1600w platinum')
  .build();

console.log(gamingPC.toString());

const officePC = new PCBuilder()
  .setCPU('Intel Core i5')
  .setGPU('Integrated Graphics')
  .setRAM('16GB DDR4')
  .setStorage('512GB SSD')
  .setCooling('Stock cooling')
  .setPcCase('Office tower')
  .setPSU('450w')
  .build();

console.log(officePC.toString());