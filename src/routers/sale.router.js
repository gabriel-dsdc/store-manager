const express = require('express');
const saleController = require('../controllers/sale.controller');
const saleMiddleware = require('../middlewares/sale.middleware');

const router = express.Router();

router.post('/', saleMiddleware, saleController.registerSale);
router.get('/', saleController.getSales);
router.get('/:id', saleController.getSaleById);

module.exports = router;
