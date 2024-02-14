const Joi = require('joi');

//defino los parametros q utilizaré en el esquema
const userId = Joi.string().uuid();
const name = Joi.string().max(100);
const email = Joi.string().email();
const password = Joi.string()/* .min(8) */;
const isAdmin = Joi.boolean();

//defino esquema para obtener todos los usuario
const getAllUsersSchema = Joi.object({
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
});

//defino esquema para obtener un usuario
const getUserSchema = Joi.object({
  id: userId.required(),
});

//defino esquema para la creación de un usuario
const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  isAdmin: isAdmin.required(),
});

//defino esquema para la actualización de un usuario
const updateUserSchema = Joi.object({
  id: userId.required(),
  name: name,
  email: email,
  password: password,
  isAdmin: isAdmin,
});

//exporto los esquemas
module.exports = {
  getAllUsersSchema,
  getUserSchema,
  createUserSchema,
  updateUserSchema,
};
