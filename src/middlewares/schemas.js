const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'string.empty': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const saleSchema = Joi.array().items({
  productId: Joi.number().required().messages({
    'any.required': '"productId" is required',
    'number.empty': '"productId" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required',
    'number.empty': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = { productSchema, saleSchema };
