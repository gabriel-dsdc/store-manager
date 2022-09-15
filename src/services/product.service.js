const productModel = require('../models/product.model');

const findProducts = async () => productModel.listAll();

const validateProduct = async ({ id }) => {
  const product = await productModel.findById(id);

  if (!product) {
    return { message: 'Product not found' };
  }
  return product;
};

const registerProduct = async (productName) => {
  const newProduct = await productModel.registerProduct(productName);

  return newProduct;
};

const updateProduct = async (productId, newProductName) => {
  const { affectedRows } = await productModel.updateProduct(productId, newProductName);
  if (affectedRows === 0) {
    return { message: 'Product not found' };
  }
};

const deleteProduct = async (productId) => {
  const { affectedRows } = await productModel.deleteProduct(productId);
  if (affectedRows === 0) {
    return { message: 'Product not found' };
  }
};

module.exports = {
  findProducts,
  validateProduct,
  registerProduct,
  updateProduct,
  deleteProduct,
};