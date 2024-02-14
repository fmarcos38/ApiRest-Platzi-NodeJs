//const { stack } = require("../routers/products.router");

//muestra por consola el error y se lo pasa al sgt middleware
function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}


//mando el error al cliente
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}


//creo middleware para boom
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler }
