const boom = require('@hapi/boom');

const { config } = require('./../config/config');

// Middleware para validar el apiKey
function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

// Middleware para validar el rol de admin - recibe un usuario
//no lo utilizo, lo reemplazo por el checkRoles
function checkAdminRole(req, res, next){
  const user = req.user;

  if(user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized());
  }
};

// Middleware para validar roles - recibe un array de roles
function checkRoles(roles){//recibe un array de roles q son los tiene permitidos
  return(req, res, next) => {
    const user = req.user;

    if(roles.includes(user.role)){ //si el rol del usuario esta en el array de roles permitidos entonces next
      next();
    }else{
      next(boom.unauthorized());
    }
  }
};

module.exports={checkApiKey, checkAdminRole, checkRoles}
