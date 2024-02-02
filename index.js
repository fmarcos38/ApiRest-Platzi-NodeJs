const express = require('express');
const routerApi = require('./src/routers/index');

const app = express();
const port = 3000;

app.use(express.json()); // para que express entienda los formatos json

//llamo a la funcion de las rutas
routerApi(app);


//levanto el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
