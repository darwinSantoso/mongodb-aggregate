const express = require('express');
const ProductsController = require('../controllers/products-controller');
const errorHandler = require('../middlewares/error-handler');
const router = express.Router();

router.get('/products', ProductsController.getAllProducts);

router.get('/products/summary', ProductsController.generateSummary);

router.use(errorHandler);

module.exports = router;
