const { Customer, CustomerSchema } = require('./customer.model');
const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

//realizo conexion con la tabla y DB
function setupModels(sequelize) { //sequelize es la instancia de la base de datos (o el tipo de conexion)
  User.init(UserSchema, User.config(sequelize)); //inicializo la tabla User con el schema UserSchema y la conexion sequelize
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  //realizo las relaciones entre las tablas
  //relacion 1:1 bidireccional entre la tabla Customer y la tabla User
  Customer.associate({ User /*o sequelize.models*/ }); //relacion 1:1 entre la tabla Customer y la tabla User
  User.associate({ Customer /*o sequelize.models*/ }); //relacion 1:1 entre la tabla User y la tabla Customer

  //relacion 1:N entre la tabla Category y la tabla Product
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);

  //relacion N:M entre la tabla Order y la tabla Product
  Order.associate(sequelize.models);
}

module.exports = setupModels;
