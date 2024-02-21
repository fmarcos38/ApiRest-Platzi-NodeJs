const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema, queryProductSchema } = require('../schemas/product.schema');

const router = express.Router();

//creo una instancia de ProductsService(por ser una clase)
const serviceProducts = new ProductsService();


//muestra  y crea productos falsos
router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

//creo un producto
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;
    const product = await serviceProducts.createProduct(name, price, id);
    res.json(product);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
});

//muestro un producto
router.get('/:id',
  //utilizo el middleware validator --> y le paso el esquema y la propiedad que quiero validar(en este caso el id que viene por params)
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await serviceProducts.getProduct(id);
    res.json(product);
  } catch (error) {
    //res.status(404).json({error: error.message});
    //utilizo el middleware para manejar errores
    next(error);
  }
});

//actualizo un producto
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await serviceProducts.updateProduct(id, name, price);

    res.json(product);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
});

//borro un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    //busco el producto
    const respuesta = await serviceProducts.deleteProduct(id);
  res.json(respuesta);
  } catch (error) {
    res,status(404).json({error: error.message});
  }
});


module.exports = router;
