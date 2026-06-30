 class ProductProviderClient {
    constructor(productProxy) {
      this.productProxy = productProxy;
    }
  
    displayItems() {
      const products = this.productProxy.getProducts();
      console.log('Products:');
      products.forEach(product => console.log(`- ${product.name}: $${product.price}`));
    }
  }
  
  //Virtual proxy
  class ProductProxy {
    constructor() {
      this.productService = new ShopProductService();
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
  
 
  class ShopProductService {
    constructor() {
      //data 
      this.products = [
        { name: 'Galaxy S24 Ultra', price: 1599,itemQuantity: 5 },
        { name: 'Iphone 15 pro', price: 1450, itemQuantity: 8 },
        { name: 'Galaxy Tab A9', price: 199,itemQuantity: 11 },
        { name: 'Galaxy Buds Pro 2', price: 169,itemQuantity: 20 },
      ];
    }
  
    fetchProducts() {
      console.log('Fetching products from the server...');
      return this.products;
    }
  }


  const productProxy = new ProductProxy();
  const client = new ProductProviderClient(productProxy);
  client.displayItems(); //load from server
  client.displayItems(); //use proxy
  client.displayItems(); //use proxy