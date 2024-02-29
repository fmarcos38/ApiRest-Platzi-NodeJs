const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  //campo para el recoveryToken (agregado mediante migración)
  recoveryToken: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'recovery_token' //lo renombro para que coincida con el nombre de la columna en la tabla
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  //metodo para definir la relacion biDireccional, 1:1 con la tabla customer
    static associate(models) {
      this.hasOne(models.Customer, {
        as: 'customer',
        foreignKey: 'userId', //esta dato viene de la tabla customer
      });
    }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }
