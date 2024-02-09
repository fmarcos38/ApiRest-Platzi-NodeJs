//tambien podría llamarlos DTO - el fin es validar la data q me llega con la libreia joi
const Joi = require('joi');

//defino un esquema para cada campo
const id = Joi.string().uuid();
const name = Joi.string().max(20);
const price = Joi.number().integer().min(1);
const isBlock = Joi.boolean();
const img = Joi.string().uri();

//defino el esquema para el producto y dentro utilizo los esquemas de los campos
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  isBlock: isBlock,
  img: img,
});

//defino el esquema para actualizar un producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  isBlock: isBlock,
  img: img,
});

//defino el esquema para el getroduc
const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
