const joi = require('joi');

//defino los parametros q utilizaré en el esquema
const userId = joi.string().uuid();
const userName = joi.string().max(100);
const userEmail = joi.string().email();
const userPassword = joi.string().min(8);
const isAdmin = joi.boolean();

//defino esquema para obtener todos los usuario
const getAllUsers = joi.object({
  limit: joi.number().integer(),
  offset: joi.number().integer(),
});

//defino esquema para obtener un usuario
const getUser = joi.object({
  id: userId.required(),
});

//defino esquema para la creación de un usuario
const createUser = joio.object({
  name: userName.required(),
  email: userEmail.required(),
  password: userPassword.required(),
  isAdmin: isAdmin.required(),
});

//defino esquema para la actualización de un usuario
const updateUser = joi.object({
  id: userId.required(),
  name: userName,
  email: userEmail,
  password: userPassword,
  isAdmin: isAdmin,
});

//exporto los esquemas
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
};
