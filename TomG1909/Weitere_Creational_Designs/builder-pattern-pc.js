/**
 * Builder Pattern - Beispiel für PC-Konfiguration
 */

// Das Produkt: Ein einfacher PC
class PC {
  constructor() {
    this.cpu = '';
    this.ram = '';
    this.storage = '';
    this.price = 0;
  }

  showConfig() {
    console.log(`=== Mein PC ===`);
    console.log(`CPU: ${this.cpu}`);
    console.log(`RAM: ${this.ram}`);
    console.log(`Storage: ${this.storage}`);
    console.log(`Preis: ${this.price}€`);
  }
}

// Builder Klasse
class PCBuilder {
  constructor() {
    this.pc = new PC();
  }

  addCPU(cpu, price) {
    this.pc.cpu = cpu;
    this.pc.price += price;
    return this; // Für Method Chaining
  }

  addRAM(ram, price) {
    this.pc.ram = ram;
    this.pc.price += price;
    return this;
  }

  addStorage(storage, price) {
    this.pc.storage = storage;
    this.pc.price += price;
    return this;
  }

  build() {
    return this.pc;
  }
}

// Director - steuert den Build-Prozess
class PCDirector {
  buildGamingPC() {
    return new PCBuilder()
      .addCPU('Intel i7', 400)
      .addRAM('32GB DDR4', 150)
      .addStorage('1TB SSD', 100)
      .build();
  }

  buildOfficePC() {
    return new PCBuilder()
      .addCPU('Intel i3', 200)
      .addRAM('8GB DDR4', 50)
      .addStorage('500GB HDD', 40)
      .build();
  }
}

// Nutzung des Builder Patterns
const director = new PCDirector();

console.log('1. Gaming PC:');
const gamingPC = director.buildGamingPC();
gamingPC.showConfig();

console.log('2. Office PC:');
const officePC = director.buildOfficePC();
officePC.showConfig();

console.log('3. Custom PC (manuell):');
const customPC = new PCBuilder()
  .addCPU('AMD Ryzen 5', 250)
  .addRAM('16GB DDR4', 80)
  .addStorage('500GB SSD', 70)
  .build();
customPC.showConfig();