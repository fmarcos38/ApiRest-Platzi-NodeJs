//archivo para generar el token o (firmar el token) con jwt
//si lo ejecuto VEO el token creado en la consola
const jwt = require('jsonwebtoken');

const secret = 'myCat'; //esto debería estar en un archivo .env (es la clave secreta para firmar el token)
const payload = {//el payload es lo q vamos a guardar/encriptar en el token
  sub: 1, //id del usuario, o identificador del token
  role: 'customer' //rol del usuario
  //...otros datos/atributos del usuario
}

//función para firmar el token
function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
