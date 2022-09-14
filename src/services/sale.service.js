const productModel = require('../models/product.model');
const saleModel = require('../models/sale.model');

const registerSale = async (salesProducts) => {
  let hasProductFound = salesProducts.map(async ({ productId }) =>
    productModel.findById(productId));
  hasProductFound = await Promise.all(hasProductFound);

  if (hasProductFound.includes(undefined)) {
    return { message: 'Product not found' };
  }

  const insertId = await saleModel.registerSaleProduct(salesProducts);
  return insertId;
};

module.exports = {
  registerSale,
};