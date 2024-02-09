const { stack } = require("../routers/products.router");

//muestra por consola el error y se lo pasa al sgt middleware
function logErrors(error, req, res, next) {
  console.log(error);
  next(error);
}


//mando el error al cliente
function errorHandler(error, req, res, next) {
  res.status(404).json({
    error: error.message,
    stack: error.stack
  });
}


//creo middleware para boom
function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(error);
  }
}


module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
}
