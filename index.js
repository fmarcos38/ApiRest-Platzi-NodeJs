const express = require('express');

const app = express();
const port = 3000;

//declaro un array de productos provisorio
const arrP = [
  {
    id: 1,
    nombre: 'Producto 1',
    precio: 1000,
    idCategory: 10
  },
  {
    id: 2,
    nombre: 'Producto 2',
    precio: 2000,
    idCategory: 11
  }
]
/*------------ENDPOINTS---------------------------------*/
app.get('/', (req, res) => {
  res.send('Hello mi server en port 3000!');
});

app.get('/products', (req, res) => {
  res.json([
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 1000
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 2000
    }
  ]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  const producto = arrP.find(p => p.id == id);

  if(producto){
    res.json(producto);
  }else{
    res.status(404).json({error: 'Producto no encontrado'});
  }
});

//recibo parametros por query
app.get('/paginados', (req, res) => {
  const { limit, offset } = req.query;

  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }

  res.send("no hay parametros");
});

//con 2 parametros
app.get('/categories/:idCategory/products/:idProduct', (req, res) => {
  const { idCategory, idProduct } = req.params;

  const products = arrP.find(p => p.idCategory == idCategory && p.id == idProduct);

  if(products){
    res.json(products);
  }
  else{
    res.status(404).json({error: 'Producto no encontrado'});
  }
});
/*------------FIN  ENDPOINTS---------------------------------*/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

