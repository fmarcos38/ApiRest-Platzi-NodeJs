const express = require('express');
//me traigo las rutas
const productsRouter = require('./products.router');
const userRouter = require('./users.router');
const customerRouter = require('./customer.router');
const categoriesRouter = require('./categories.router');
const ordersRouter = require('./orders.router');

//creo funcion para las rutas
function routerApi(app) {
  const router = express.Router();

  //creo ruta global
  app.use('/api/v1', router);

  //uso las rutas
  router.use('/users', userRouter);
  router.use('/products', productsRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;
