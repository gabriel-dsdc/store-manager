const productModel = require('../models/product.model');

const findProducts = async () => productModel.listAll();

const validateProduct = async ({ id }) => {
  const product = await productModel.findById(id);

  if (!product) {
    return { message: 'Product not found' };
  }
  return product;
};

module.exports = {
  findProducts,
  validateProduct,
};