const productModel = require('../models/product.model');

const findProduct = async () => productModel.listAll();

const validateProduct = async ({ id }) => {
  const product = await productModel.findById(id);

  if (!product) {
    return { message: 'Product not found' };
  }
  return product;
};

module.exports = {
  findProduct,
  validateProduct,
};