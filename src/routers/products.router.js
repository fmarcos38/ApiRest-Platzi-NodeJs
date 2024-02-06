const express = require('express');
const ProductsService = require('./../services/product.service');

const router = express.Router();

//creo una instancia de ProductsService(por ser una clase)
const serviceProducts = new ProductsService();


//muestra  y crea productos falsos
router.get('/', (req, res) => {
  const products = serviceProducts.getProducts();
  res.json(products);
});

//creo un producto
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const product = serviceProducts.createProduct(name, price, id);

  if(!product.name){
    res.status(400).json(product);
  }
  res.status(201).json(product);
});

//muestro un producto
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const product = serviceProducts.getProduct(id);
  //si no existe
  if(!product){
    res.status(404).json({error: 'product not found'});
  } else {
    res.json(product);
  }
});

//actualizo un producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const product = serviceProducts.updateProduct(id, name, price);

  if(!product){
    res.status(404).json({error: 'product not found'});
  } else {
    res.json(product);
  }
});

//borro un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  //busco el producto
  const product = serviceProducts.deleteProduct(id);

  if(!product){
    res.status(404).json({error: 'product not found'});
  } else {
    res.json({deleted: product});
  }
});


module.exports = router;
