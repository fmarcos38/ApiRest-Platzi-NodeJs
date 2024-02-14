require('dotenv').config(); //esto es para que lea las variables de entorno del archivo .env

const config = {
  env: process.env.NODE_ENV || 'dev', //dev, test, prod entornos de desarrollo, pruebas y produccion
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
}

module.exports = { config };
