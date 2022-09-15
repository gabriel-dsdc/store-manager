const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const products = await productService.findProducts();
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

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.registerProduct(name);

  return res.status(201).json({
    id: newProduct.insertId,
    name,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const productNotFound = await productService.updateProduct(id, name);

  if (productNotFound) {
    return res.status(404).json(productNotFound);
  }
  return res.status(200).json({
    id,
    name,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
};
