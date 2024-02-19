const express = require('express');
const routerApi = require('./src/routers/index');
//cors es un middleware que me permite hacer peticiones desde otros dominios
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./src/middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json()); // para que express entienda los formatos json
app.use(cors()); // para que express entienda las peticiones de otros dominios
//con esta configuración SOLO acepta peticiones de siertos dominios(u origenes)
/* const dominiosAutorizados = ['htt://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if(dominiosAutorizados.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('Dominio no autorizado'));
    }
  }
};
app.use(cors(options));
*/

//------llamo a la funcion de las rutas
routerApi(app);

//------middleware para manejar errores (estos son los middleware de error)
//------por eso los declaro al final (siempre despues de las rutas
app.use(logErrors);
app.use(ormErrorHandler);//middleware para manejar errores de sequelize
app.use(boomErrorHandler);//middlewara para manejar errores de boom
app.use(errorHandler);


//-----levanto el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
