const faker = require('faker'); //se utiliza para generar datos falsos
const boom = require('@hapi/boom'); //se utiliza para manejar errores

class UsersService {
  constructor(){
    //declaro el array de users q oy a tener en memoria
    this.users = [];
    //genero usuarios falsos al instanciarce la clase MEDIANTE el metodo generate
    //this.generate();
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
  }

  //muestro todos los usuarios
  async getUsers(){
    if(this.users.length === 0){
      throw boom.notFound('users not found');
    }
    return this.users;
  }
}

module.exports = UsersService;
