const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models'); //importo la funcion q inicializa los modelos


//protejo las credenciales de la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//creo instancia de sequelize SIN migraciones
var sequelize = new Sequelize(config.dbName, USER, PASSWORD, {
  dialect: 'postgres'
});

//inicializo los modelos
setupModels(sequelize);

//si no utilizo migraciones, puedo usar el metodo sync para crear las tablas
//force: true, para que se borren las tablas y se creen nuevamente
/* sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  }); */


module.exports = sequelize;




