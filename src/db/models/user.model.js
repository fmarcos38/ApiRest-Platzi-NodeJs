const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users'; //nombre de la tabla "users"

//creo schema de la tabla este schema define la estructura de la tabla en la DB
const userSchema = {
  //atributos de la tabla
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    allowNull:false,
    type:DataTypes.STRING,
  },
  email:{
    allowNull:false,
    type:DataTypes.STRING,
    unique:true,
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at', //nombre del campo en la base de datos
    defaultValue: Sequelize.NOW,
  },
};

//creo la clase User q extiende de Model, model tiene los metodos(querys) para interactuar con la base de datos
class User extends Model {
  static associate() { }
  // defino las relaciones

  //realizo conexion con la tabla
  static config(sequelize) {
    return {
      sequelize, //tipos de coneion
      tableName: USER_TABLE, //nombre de la tabla
      modelName: 'User', //nombre del modelo
      timestamps: false, //no quiero que se creen los campos de createdAt y updatedAt
    };
  }

};

module.exports = {
  USER_TABLE,
  userSchema,
  User,
};
