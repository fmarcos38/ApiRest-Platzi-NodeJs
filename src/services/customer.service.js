const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() { }

  //metodos para el CRUD
  async find() {
    const rta = await models.Customer.findAll({ include: ['user'] });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) { throw boom.notFound('customer not found'); }
    return user;
  }

  //metodo para crear un cliente con su usuario [crea un usuario y un cliente al mismo tiempo]
  async create(data) {
    const newCustomer = await models.Customer.create(data, { include: ['user'] }); //este alias es el que se definio en el modelo
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id); const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id); await model.destroy();
    return { rta: true };
  }
}
module.exports = CustomerService;
