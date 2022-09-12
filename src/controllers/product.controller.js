const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const products = await productService.findProduct();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await productService.validateProduct({ id });
  if (product.message) {
    return res.status(404).json(product);
  }
  return res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};
