const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models'); //importo la funcion q inicializa los modelos


//protejo las credenciales de la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//creo instancia de sequelize
var sequelize = new Sequelize(config.dbName, USER, PASSWORD, {
  dialect: 'postgres'
});

//inicializo los modelos
setupModels(sequelize);

sequelize.sync({ force: false }) //force: true, para que se borren las tablas y se creen nuevamente
  .then(() => {
    console.log('Database & tables created!');
  });


module.exports = sequelize;
