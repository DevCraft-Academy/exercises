// ProductService: Real Subject - Simuliert Datenbankzugriff
class ProductService {
    getProducts() {
        console.log('Fetching products from the server...');
        // Simulierte Produktdaten
        return [
            { name: 'Laptop', price: 999.99 },
            { name: 'Mouse', price: 29.99 },
            { name: 'Keyboard', price: 79.99 },
            { name: 'Monitor', price: 299.99 },
            { name: 'Headphones', price: 149.99 }
        ];
    }
}

// ProductProxy: Virtual proxy to fetch products lazily with caching
class ProductProxy {
    constructor() {
        this.productService = new ProductService();
        this.productsCache = [];
    }

    getProducts() {
        if (this.productsCache.length === 0) {
            console.log('Fetching products from the proxy...');
            const products = this.productService.getProducts();
            this.productsCache = products;
        } else {
            console.log('Retrieving products from cache...');
        }
        return this.productsCache;
    }
}

// Client: Displays products
class Client {
    displayProducts(products) {
        console.log('Products:');
        products.forEach(product => 
            console.log(`- ${product.name}: $${product.price}`)
        );
    }
}

// Example usage - Vereinfachte Demo
console.log('=== Vereinfachte Online-Shop Proxy Demo ===\n');

const productProxy = new ProductProxy();
const client = new Client();

// Test 1: Erste Abfrage (langsam)
console.log('1. Erste Abfrage:');
const start1 = Date.now();
const products1 = productProxy.getProducts();
const duration1 = Date.now() - start1;
client.displayProducts(products1);
console.log(`Time taken: ${duration1}ms\n`);

// Test 2: Zweite Abfrage (schnell - aus Cache)
console.log('2. Zweite Abfrage:');
const start2 = Date.now();
const products2 = productProxy.getProducts();
const duration2 = Date.now() - start2;
client.displayProducts(products2);
console.log(`Time taken: ${duration2}ms\n`);

module.exports = { ProductService, ProductProxy, Client };