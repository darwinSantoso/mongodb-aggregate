const express = require('express');
const errorHandler = require('../middlewares/error-handler');
const router = express.Router();

const ProductsController = require('../controllers/products-controller');
const TransactionsController = require('../controllers/transactions-controller');

router.get('/products', ProductsController.getAllProducts);

router.get('/products/summary', ProductsController.generateSummary);

router.get('/transactions', TransactionsController.findTransactionByStatus);

router.get(
  '/transactions/revenue',
  TransactionsController.getTransactionRevenues
);

router.get(
  '/transactions/summary',
  TransactionsController.generateTransactionsSummary
);

router.use(errorHandler);

module.exports = router;
