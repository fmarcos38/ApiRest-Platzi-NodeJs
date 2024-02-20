const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { on } = require('nodemon');
const Unique = require('faker/lib/unique');
const unique = require('faker/vendor/unique');

//creo el nombre de la tabla
const CUSTOMER_TABLE = 'customer';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: { //atributo para la relacion 1:1 con la tabla user
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'user_id',
    references: {
      model: USER_TABLE, //tabla con la que se relaciona
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
};

//creo la clase que representa la tabla
class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'}); //relacion 1:1 con la tabla user, esto es un alias --> {as: 'user'}
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
