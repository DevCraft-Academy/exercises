// ProductService: Service to fetch products from the server
class ProductService {
  constructor() {
    // Simulated data fetching
    this.products = [
      { name: 'Product 1', price: 10 },
      { name: 'Product 2', price: 20 },
      { name: 'Product 3', price: 30 },
    ];
  }

  getProducts() {
    console.log('Fetching products from the server...');
    return this.products;
  }
}

// ProductProxy: Virtual proxy to fetch products lazily
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
  constructor(productProxy) {
    this.productProxy = productProxy;
  }

  displayProducts() {
    const products = this.productProxy.getProducts();
    console.log('Products:');
    products.forEach(product => console.log(`- ${product.name}: $${product.price}`));
  }
}

// Example usage
const productProxy = new ProductProxy();
const client = new Client(productProxy);
client.displayProducts();