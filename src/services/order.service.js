const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

  //obtiene las ordenes de un cliente - pero las busco a travez del usuario
  async findOrderByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId //aca se hace el join(asociacion) con la tabla user
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  }
}

module.exports = OrderService;
