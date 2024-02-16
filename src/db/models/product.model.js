const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isBlock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}

class Product extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}


module.exports = { PRODUCT_TABLE, ProductSchema, Product}




/*--------------------------------------------------------------------------------
const { Model, DataTypes, Sequelize } = require('sequelize');

//creo variable para almacenar el nombre q llevará la tabla
const PRODUCT_TABLE = 'products';

//creo el schema de la tabla
const productSchema = {
};

//creo la clase q representa la tabla
class Product extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: Product,
      timestamps: false,
    };
  }
}

//exporto el modelo y el schema
module.exports = {
  PRODUCT_TABLE, //nombre de la tabla
  Product, //modelo de la tabla
  productSchema, //schema de la tabla
};

*/
