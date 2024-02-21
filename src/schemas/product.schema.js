//tambien podría llamarlos DTO - el fin es validar la data q me llega con la libreia joi
const Joi = require('joi');

//defino un esquema para cada campo
const id = Joi.string().uuid();
const name = Joi.string().max(20);
const price = Joi.number().integer().min(1);
const isBlock = Joi.boolean();
const img = Joi.string().uri();
const categoryId = Joi.number().integer(); //para el caso de la relacion

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

//defino el esquema para el producto y dentro utilizo los esquemas de los campos
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  isBlock: isBlock,
  img: img,
  categoryId: categoryId.required(),
});

//defino el esquema para actualizar un producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  isBlock: isBlock,
  img: img,
  categoryId,
});

//defino el esquema para el getroduc
const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
