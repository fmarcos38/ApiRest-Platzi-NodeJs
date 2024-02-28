const jwt = require('jsonwebtoken');

const secret = 'myCat';

//creo variable token con el token creado en token-sign
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwOTE0NTYwMH0.eqoaq12iyhDei0AUuc3KynBjdyweTvcjQ5omxJqXSVI'
//funcion para verificar el token
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);

//el resultado de ejecutar este archivo es el payload del token, es decir, los datos que se guardaron en el token
