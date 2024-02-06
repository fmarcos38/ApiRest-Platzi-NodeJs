const faker = require('faker');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate(); //genero productos falsos
  }

  //metodos
  //genero productos falsos
  generate() {
    const limit = 10;

    //creacion automatica de productos falsos
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price()
      })
    };

    return this.products;
  }

  //muestro productos
  getProducts() {
    return this.products;
  }

  //muestro un producto
  getProduct(id) {
    return this.products.find((product) => product.id === id);
  }

  //creo un producto
  createProduct(name, price, id){

    if(!name || !price){
      return 'name and price are required';
    } else {
      const newProduct = {
        id: id || faker.datatype.uuid(),
        name,
        price
      }
      return newProduct;
    }
  }

  //actualizo un producto
  updateProduct(id, name, price){
    //busco el indice del producto
    const index = this.products.findIndex((product) => product.id === id);

    if(index === -1){
      return 'product not found';
    } else {
      this.products[index].name = name;
      this.products[index].price = price;
      return this.products[index];
    }
  }

  //borro un producto
  deleteProduct(id){
    //busco el prod
    const prod = this.products.find((product) => product.id === id);

    if(!prod){
      return 'product not found';
    } else {
      this.products = this.products.filter((product) => product.id !== id);
      return prod;
    }
  }
};

module.exports = ProductsService;
