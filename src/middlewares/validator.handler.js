const { boom } = require("@hapi/boom");

function validatorHandler(schema, property) {
  return(req,res,next)=>{
    const data = req[property]; //property toma el valor de la propiedad que le paso en la ruta (osea puede venir por body, params, query)
    const{error} = schema.validate(data,{abortEarly:false});
    if(error){
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

module.exports = validatorHandler;


