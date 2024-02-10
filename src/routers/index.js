const express = require('express');
//me traigo las rutas
const productsRouter = require('./products.router');
const userRouter = require('./users.router');
//creo funcion para las rutas
function routerApi(app) {
  const router = express.Router();

  //creo ruta global
  app.use('/api/v1', router);

  //uso las rutas
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
}

module.exports = routerApi;
