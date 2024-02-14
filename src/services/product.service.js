const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
class ProductsService {

  constructor() {
    this.products = [];
  }

  //metodos
  //genero productos falsos
  /* generate() {
    const limit = 10;

    //creacion automatica de productos falsos
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        isBlock: faker.datatype.boolean(), //es para roductos q no quiero q se vean
      })
    };

    return this.products;
  } */


  //---------------------------------------------------------------------------
  //muestro productos
  async getProducts() {
    const query = 'SELECT * FROM products';
    const [data, metadata] = await sequelize.query(query); //saquelize tamb deja realizar querys
    return { data, metadata };
  }

  //muestro un producto
  async getProduct(id) {
    //busco el producto
    const prod = this.products.find((product) => product.id === id);
    if(!prod){
      //sin los middlewares NI boom
      //throw new Error('product not found');
      //con boom
      throw boom.notFound('product not found');
    }
    //si es un rod q no quiero q se vea
    if(prod.isBlock){
      throw boom.unauthorized('product not available');
      //otra ocion de boom
      //throw boom.conflict('product not available');
    }
    return prod;
  }

  //creo un producto
  async createProduct(name, price, id){
    if(!name || !price){
      throw new Error('name and price are required');
    } else {
      const newProduct = {
        id: id || faker.datatype.uuid(),
        name,
        price
      };
      this.products.push(newProduct);
      return newProduct;
    }
  }

  //actualizo un producto
  async updateProduct(id, name, price){
    //busco el indice del producto
    const index = this.products.findIndex((product) => product.id === id);

    if(index === -1){
      throw new Error('product not found'); //mensaje q me va a mostrar en el catch;
    } else {
      this.products[index].name = name;
      this.products[index].price = price;
      return this.products[index];
    }
  }

  //borro un producto
  async deleteProduct(id){
    //busco el prod
    const prod = this.products.find((product) => product.id === id);

    if(!prod){
      throw boom.notFound('product not found');
    } else {
      this.products = this.products.filter((product) => product.id !== id);
      return prod;
    }
  }
};

module.exports = ProductsService;
