const { User, UserSchema } = require('./user.model'); //importo el modelo y el schema de la tabla User

//realizo conexion con la tabla y DB
function setupModels(sequelize) { //sequelize es la instancia de la base de datos (o el tipo de conexion)
  User.init(UserSchema, User.config(sequelize)); //inicializo la tabla User con el schema UserSchema y la conexion sequelize
}

module.exports = setupModels;
