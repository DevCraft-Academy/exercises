class Product {
  constructor(name) {
    this.name = name;
  }
}

class ProductService {
  constructor() {
    this.products = [
      new Product("Apple"),
      new Product("Banana"),
      new Product("Orange"),
    ];
  }

  getProducts() {
    // Simulate fetching products from a database or API
    console.log("Fetching products...");
    return this.products;
  }
}

class ProductProxy {
  constructor() {
    this.productService = new ProductService();
    this.productCache = [];
  }

  getProducts() {
    if (this.productCache.length === 0) {
      console.log("Fetching products from ProductService...");
      this.productCache = this.productService.getProducts();
    } else {
      console.log("Returning cached products...");
    }
    return this.productCache;
  }
}

class Client {
  constructor() {
    this.productProxy = new ProductProxy();
  }

  useProducts() {
    const products = this.productProxy.getProducts();
    console.log("Products in use:");
    products.forEach((product) => console.log(`Product: ${product.name}`));
  }
}

const client = new Client();
client.useProducts(); // This call will fetch products from ProductService
client.useProducts(); // This call will use the cached products
