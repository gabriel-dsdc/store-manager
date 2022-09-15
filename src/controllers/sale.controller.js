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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleNotFound = await saleService.deleteSale(id);

  if (saleNotFound) {
    return res.status(404).json(saleNotFound);
  }
  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const saleOrProductNotFound = await saleService.updateSale(id, req.body);

  if (saleOrProductNotFound) {
    return res.status(404).json(saleOrProductNotFound);
  }
  return res.status(200).json({
    saleId: id,
    itemsUpdated: req.body,
  });
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
