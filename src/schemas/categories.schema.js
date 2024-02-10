const joi = require('joi');

//defino los parametros q utilizaré en el esquema
const categoryId = joi.string().uuid();
const name = joi.string().max(50);

//defino esquema para obtener todos las categorias
const getAllCategories = joi.object({
  limit: joi.number().integer(),
  offset: joi.number().integer(),
});

//defino esquema para obtener una categoria
const getCategory = joi.object({
  id: categoryId.required(),
});

//defino esquema para la creación de una categoria
const createCategory = joi.object({
  name: name.required(),
});

//defino esquema para la actualización de una categoria
const updateCategory = joi.object({
  id: categoryId.required(),
  name: name,
});

//exporto los esquemas
module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
};
