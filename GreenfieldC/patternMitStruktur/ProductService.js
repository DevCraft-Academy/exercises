class RealProductService {
    getProducts() {
        // Simuliert eine langsame Datenbankabfrage
        console.log("Lade Produkte aus der Datenbank...");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Laptop", price: 1200 },
                    { id: 2, name: "Smartphone", price: 800 },
                ]);
            }, 2000);
        });
    }
}

class ProductServiceProxy {
    constructor() {
        this.realService = new RealProductService();
        this.cache = null;
    }

    async getProducts() {
        if (this.cache) {
            console.log("Produkte aus dem Cache geladen.");
            return this.cache;
        }
        this.cache = await this.realService.getProducts();
        return this.cache;
    }
}

async function main() {
    const productService = new ProductServiceProxy();

    // Erstes Laden (aus "Datenbank")
    const products1 = await productService.getProducts();
    console.log(products1);

    // Zweites Laden (aus Cache, sofort)
    const products2 = await productService.getProducts();
    console.log(products2);
}

// main(); // Zum Testen einkommentieren
