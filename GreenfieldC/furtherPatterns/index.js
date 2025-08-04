// Abstrakte Basisklasse für Komponenten
class Component {
    constructor(type, name, specs) {
        this.type = type; // z.B. 'CPU', 'GPU'
        this.name = name;
        this.specs = specs; // Objekt mit spezifischen Eigenschaften
    }

    getDescription() {
        return `${this.type}: ${this.name} (${JSON.stringify(this.specs)})`;
    }
}

// Konkrete Komponentenklassen
class CPU extends Component {
    constructor(name, cores, frequency) {
        super('CPU', name, { cores, frequency });
    }
}

class GPU extends Component {
    constructor(name, memory) {
        super('GPU', name, { memory });
    }
}

class RAM extends Component {
    constructor(name, size, type) {
        super('RAM', name, { size, type });
    }
}

class Storage extends Component {
    constructor(name, capacity, storageType) {
        super('Storage', name, { capacity, storageType });
    }
}

// PC-Konfiguration, flexibel für beliebige Komponenten
class PCConfiguration {
    constructor() {
        this.components = {};
    }

    addComponent(component) {
        this.components[component.type] = component;
    }

    getConfiguration() {
        return Object.values(this.components).map(c => c.getDescription()).join('\n');
    }
}

// Beispiel: Zwei verschiedene PC-Konfigurationen

// Gaming-PC
const gamingPC = new PCConfiguration();
gamingPC.addComponent(new CPU('Intel i9-13900K', 24, '5.8GHz'));
gamingPC.addComponent(new GPU('NVIDIA RTX 4090', '24GB'));
gamingPC.addComponent(new RAM('Corsair Vengeance', '32GB', 'DDR5'));
gamingPC.addComponent(new Storage('Samsung 980 Pro', '2TB', 'NVMe SSD'));

console.log('Gaming-PC-Konfiguration:\n' + gamingPC.getConfiguration());

// Office-PC
const officePC = new PCConfiguration();
officePC.addComponent(new CPU('Intel i5-12400', 6, '4.4GHz'));
officePC.addComponent(new GPU('Intel UHD Graphics 730', 'Shared'));
officePC.addComponent(new RAM('Kingston ValueRAM', '16GB', 'DDR4'));
officePC.addComponent(new Storage('Crucial MX500', '500GB', 'SATA SSD'));

console.log('\nOffice-PC-Konfiguration:\n' + officePC.getConfiguration());

// ...bestehender Code...
