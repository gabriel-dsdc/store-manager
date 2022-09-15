const express = require('express');
const productController = require('../controllers/product.controller');
const productMiddleware = require('../middlewares/product.middleware');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', productMiddleware, productController.registerProduct);

router.put('/:id', productMiddleware, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
