// Basisklasse für alle Komponenten
class Component {
    constructor(name, type, price) {
        if (new.target === Component) {
            throw new TypeError("Cannot construct Component instances directly");
        }
        this.name = name;
        this.type = type;
        this.price = price;
    }
    getDetails() {
        return `${this.name} (${this.type}) - ${this.price}€`;
    }
}

// Spezifische Komponenten-Klassen
class CPU extends Component {
    constructor(name, price, cores, clockSpeedGhz) {
        super(name, "CPU", price);
        this.cores = cores;
        this.clockSpeedGhz = clockSpeedGhz;
    }

    getDetails() {
        return `${super.getDetails()}, Cores: ${this.cores}, Clock: ${this.clockSpeedGhz} GHz`;
    }
}

class GPU extends Component {
    constructor(name, price, vramGB, clockSpeedMhz) {
        super(name, "GPU", price);
        this.vramGB = vramGB;
        this.clockSpeedMhz = clockSpeedMhz;
    }

    getDetails() {
        return `${super.getDetails()}, VRAM: ${this.vramGB} GB, Clock: ${this.clockSpeedMhz} MHz`;
    }
}

class RAM extends Component {
    constructor(name, price, capacityGB, speedMhz, type) {
        super(name, "RAM", price);
        this.capacityGB = capacityGB;
        this.speedMhz = speedMhz;
        this.type = type; // e.g., DDR4, DDR5
    }

    getDetails() {
        return `${super.getDetails()}, Capacity: ${this.capacityGB} GB, Speed: ${this.speedMhz} MHz, Type: ${this.type}`;
    }
}

class Storage extends Component {
    constructor(name, price, capacityGB, type, interfaceType) {
        super(name, "Storage", price);
        this.capacityGB = capacityGB;
        this.type = type;
        this.interface = interfaceType;
    }

    getDetails() {
        return `${super.getDetails()}, Capacity: ${this.capacityGB} GB, Type: ${this.type}, Interface: ${this.interface}`;
    }
}

// Klasse für den Komponenten-Katalog
class ComponentCatalog {
    constructor() {
        this.availableComponents = new Map(); // Map<string, Component[]>
    }

    addComponent(component) {
        if (!this.availableComponents.has(component.type)) {
            this.availableComponents.set(component.type, []);
        }
        this.availableComponents.get(component.type).push(component);
    }

    getAvailableComponents(type) {
        return this.availableComponents.get(type);
    }

    getAllAvailableComponents() {
        return this.availableComponents;
    }
}

// Klasse für die PC-Konfiguration
class PCConfiguration {
    constructor() {
        this.selectedComponents = new Map();
    }

    addComponent(component) {
        if (!(component instanceof Component)) {
             throw new Error("Only Component instances can be added.");
        }
        // Vorhandene Komponente desselben Typs werden ersetzt
        this.selectedComponents.set(component.type, component);
        console.log(`Added/Replaced ${component.type}: ${component.name}`);
    }

    getComponent(type) {
        return this.selectedComponents.get(type);
    }

    getTotalPrice() {
        let total = 0;
        for (const component of this.selectedComponents.values()) {
            total += component.price;
        }
        return total;
    }

    getConfigurationSummary() {
        let summary = "--- PC Configuration Summary ---\n";
        if (this.selectedComponents.size === 0) {
            summary += "No components selected yet.\n";
        } else {
            for (const [type, component] of this.selectedComponents.entries()) {
                summary += `- ${component.getDetails()}\n`;
            }
            summary += `\nTotal Price: ${this.getTotalPrice()}€\n`;
        }
        summary += "------------------------------";
        return summary;
    }
}
