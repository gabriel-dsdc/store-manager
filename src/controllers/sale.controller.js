const saleService = require('../services/sale.service');

const registerSale = async (req, res) => {
  const insertId = await saleService.registerSale(req.body);

  if (insertId.message) {
    return res.status(404).json(insertId);
  }

  return res.status(201).json({
    id: insertId,
    itemsSold: req.body,
  });
};

const getSales = async (_req, res) => {
  const allSales = await saleService.getSales();
  return res.status(200).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const saleProducts = await saleService.getSaleById(id);
  if (!saleProducts.message) {
    return res.status(200).json(saleProducts);
  }
  return res.status(404).json(saleProducts);
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
};
