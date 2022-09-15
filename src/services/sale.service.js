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

const getSales = async () => {
  const allSales = await saleModel.getSales();
  return allSales;
};

const getSaleById = async (saleId) => {
  const saleProducts = await saleModel.getSaleById(saleId);

  if (saleProducts[0]) {
    return saleProducts;
  }
  return { message: 'Sale not found' };
};

const deleteSale = async (saleId) => {
  const { affectedRows } = await saleModel.deleteSale(saleId);

  if (affectedRows === 0) {
    return { message: 'Sale not found' };
  }
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  deleteSale,
};