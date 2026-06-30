1. Analyse & Pattern-Auswahl
Problem:
Beim Laden vieler Produktdaten aus der Datenbank gibt es Verzögerungen.

Ziel:
Leistung verbessern, indem unnötige Datenbankzugriffe vermieden werden.

Geeignetes Design Pattern:
Proxy Pattern – Ein Proxy kann als Zwischenspeicher (Cache) agieren und so wiederholte, teure Datenbankzugriffe vermeiden.

2. UML-Diagramm (vereinfachte Darstellung)

+-------------------+        +-------------------+        +-------------------+
|   ProductService  |<------>| ProductServiceProxy|<------>|   Client          |
+-------------------+        +-------------------+        +-------------------+
| +getProducts()    |        | +getProducts()    |        |                   |
+-------------------+        +-------------------+        +-------------------+

ProductService: Holt Daten aus der Datenbank.
ProductServiceProxy: Prüft, ob Daten im Cache sind, sonst ruft er ProductService auf.
Client: Fragt Produkte über den Proxy an.

3. JavaScript-Implementierung

class ProductService {
  async getProducts() {
    // Simuliere langsamen Datenbankzugriff
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
   
          { id: 1, name: "Laptop" },
          { id: 2, name: "Smartphone" },
          { id: 3, name: "Headphones" }
   
        ]);
      }, 2000); // 2 Sekunden Verzögerung
    });
  }
}

class ProductServiceProxy {
  constructor() {
    this.productService = new ProductService();
    this.cache = null;
  }

  async getProducts() {
    if (this.cache) {
      console.log("Produkte aus Cache geladen.");
      return this.cache;
    }
    console.log("Produkte aus Datenbank geladen.");
    this.cache = await this.productService.getProducts();
    return this.cache;
  }
}

async function main() {
  const proxy = new ProductServiceProxy();

  console.log(await proxy.getProducts());

  console.log(await proxy.getProducts());
}

main();
