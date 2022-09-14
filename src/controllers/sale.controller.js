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

module.exports = {
  registerSale,
};
