'use strict';

const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  up: async (queryInterface) => {
    //instrucciones para modificar la tabla
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      //envio solo estos atributos para modificar la columna, los demas se mantienen
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
