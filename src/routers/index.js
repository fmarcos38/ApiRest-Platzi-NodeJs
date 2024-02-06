const express = require('express');
//me traigo las rutas
const productsRouter = require('./products.router');

//creo funcion para las rutas
function routerApi(app) {
  const router = express.Router();

  //creo ruta global
  app.use('/api/v1', router);

  //uso las rutas
  router.use('/products', productsRouter);
}

module.exports = routerApi;
