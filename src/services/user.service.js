const faker = require('faker'); //se utiliza para generar datos falsos
const boom = require('@hapi/boom'); //se utiliza para manejar errores
const getConnection = require('../libs/postgres'); //se utiliza para conectarse a la base de datos
const sequelize = require('../libs/sequelize'); //se utiliza para conectarse a la base de datos

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
    const query = 'SELECT * FROM users';
    const [data] = await sequelize.query(query);
    return data;
  };

  //muestro un usuario por id
  async getUser(id){
    const user = this.users.find(u => u.id === id);

    if(!user){
      throw boom.notFound('user not found');
    }

    return user;
  };

  //creo usuario
  async createUser(data){
    console.log("data", data);
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.users.push(newUser);
    return newUser;
  };

  //actualizo usuario
  async updateUser(id, changer){

  }
}

module.exports = UsersService;


