const ProductsModel = require('../models/products-model');

class ProductsController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await ProductsModel.getAllProducts();

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async generateSummary(req, res, next) {
    try {
      const summary = await ProductsModel.generateSummary();

      res.status(200).json(summary);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ProductsController;
