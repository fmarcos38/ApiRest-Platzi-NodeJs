const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
class ProductsService {

  constructor() {
    this.products = [];//quitar
  }

  //metodos
  //---------------------------------------------------------------------------
  //muestro productos
  async getProducts() {
    const query = 'SELECT * FROM products';
    const [data] = await sequelize.query(query);
    return data;
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

  //muestra productos CON relacion a la categoria y Paginación, y filtros
  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;

    if (limit && offset) {
      options.limit =  limit;
      options.offset =  offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min, //Op es un objeto que me da sequelize, y gte es mayor o igual
        [Op.lte]: price_max, //lte es menor o igual
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  //creo un producto
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
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
