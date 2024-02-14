const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

//protejo las credenciales de la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//creo instancia de sequelize
const sequelize = new Sequelize(URI, {
  dialect: 'postgres', //indicamos que vamos a usar postgres
  logging: false,
});

module.exports = sequelize;
