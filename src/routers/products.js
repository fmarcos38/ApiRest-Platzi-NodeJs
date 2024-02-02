const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  //creo productos falsos
  const products = [];
  const { cant } = req.query;
  const limit = cant || 10;

  for(let i = 0; i < limit; i++){
    products.push({
      id: faker.datatype.uuid(),
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price()
    })
  };

  res.json(products);
});


module.exports = router;
