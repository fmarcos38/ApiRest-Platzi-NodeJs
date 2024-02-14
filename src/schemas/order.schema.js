const joi = require('joi');

//defino los parametros q utilizaré en el esquema
const branId = joi.string().uuid();
const name = joi.string().max(50);

//defino esquema para obtener todos las marcas
const getAllBrans = joi.object({
  limit: joi.number().integer(),
  offset: joi.number().integer(),
});

//defino esquema para obtener una marca
const getBran = joi.object({
  id: branId.required(),
});

//defino esquema para la creación de una marca
const createBran = joi.object({
  name: name.required(),
});

//defino esquema para la actualización de una marca
const updateBran = joi.object({
  id: branId.required(),
  name: name,
});

//exporto los esquemas
module.exports = {
  getAllBrans,
  getBran,
  createBran,
  updateBran,
};
