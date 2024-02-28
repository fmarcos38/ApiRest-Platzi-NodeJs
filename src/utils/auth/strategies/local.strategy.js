const Strategy = require("passport-local");
const userService = require("../../services/user.service");
const boom = require("@hapi/boom");


const LocalStrategy = new Strategy({
    // Aquí cambio los nombrs de los campos por defecto
    usernameField: "email",
    passwordField: "password",
  },
  async(email, password, done) => {
  // Aquí va la lógica de la autenticación
  try {
    // busco por email con la funcion creada en el service user
    const user = await userService.findByEmail(email);
    // si no existe el usuario
    if (!user) {
      done(boom.unauthorized("User not found"), false);
    }
    // comparo la contraseña
    if (!(await bcrypt.compare(password, user.password))) {
      done(boom.unauthorized("Password not match"), false);
    }
    //elimino el envio del password (este forma es solo para sequelize)
    delete user.dataValues.password;
    //si todo es correcto devuelvo el usuario
    done(null, user);
  } catch (error) {
      done(error, false);
  }
});

module.exports = LocalStrategy;
