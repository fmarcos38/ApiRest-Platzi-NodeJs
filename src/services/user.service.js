const faker = require('faker'); //se utiliza para generar datos falsos
const boom = require('@hapi/boom'); //se utiliza para manejar errores
const getConnection = require('../libs/postgres'); //se utiliza para conectarse a la base de datos
const sequelize = require('../libs/sequelize'); //se utiliza para conectarse a la base de datos
const bcrypt = require('bcrypt'); //se utiliza para encriptar la contraseña
class UsersService {
  constructor(){
    //declaro el array de users q oy a tener en memoria
    this.users = [];
    //genero usuarios falsos al instanciarce la clase MEDIANTE el metodo generate
    this.generate();
  }

  //metodos
  //genero usuarios falsos
  generate(){
    const limit = 10;

    //creacion automatica de usuarios falsos
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        isBlock: faker.datatype.boolean(), //es para usuarios q no quiero q se vean
      })
    };

    return this.users;
  };

   //muestra usuarios Conexion Client
  async findClient(){
    const client= await getConnection();
    const rta=await client.query('SELECT * FROM users');
    return rta.rows;
  }
  //muestra usuarios Conexion Sequelize
  async findSequelize() {
    //opc 1
    /* const query = 'SELECT * FROM users';
    const [data] = await sequelize.query(query); */
    //opc 2
    const data = await sequelize.models.User.findAll(); //de esta manera se está utilizando Prog orientada a objetos
    return data;
  };

  //muestra un usuario por id
  async getUser(id){
    const user = await sequelize.models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  /*--------metodos find con relaciones-----------*/
  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  //busco por email
  async findByEmail(email){
    const user = await sequelize.models.User.findOne({ where: { email } }); //puede q no sea necesario el sequelize
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  /*-------------------*/

  //creo usuario
  async createUser(data){
    const hash = await bcrypt.hash(data.password, 10);
    const newser = await sequelize.models.User.create({ //de esta forma clono el objeto y le agrego el password encriptado
      ...data,
      password: hash,
    });
    //elimino el envio del password (este forma es solo para sequelize)
    delete newser.dataValues.password;
    return newser;
  }

  //actualizo usuario
  async updateUser(id, changer){
    const user = await this.getUser(id);
    return await user.update(changer);
  }

  //elimino usuario
  async deleteUser(id){
    const user = await this.getUser(id);
    return await user.destroy();
  }
}

module.exports = UsersService;


