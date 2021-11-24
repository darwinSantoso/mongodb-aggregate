const ProductsModel = require('../models/products-model');

class ProductsController {
  static async getAllProducts(req, res, next) {
    try {
      let products;

      console.log(req.query);

      if (req.query.categoryId) {
        products = await ProductsModel.getProductsByCategoryId(
          req.query.categoryId
        );
      } else {
        products = await ProductsModel.getAllProducts();
      }

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async generateSummary(req, res, next) {
    try {
      const summary = await ProductsModel.generateSummary(req.query.categoryId);

      res.status(200).json(summary);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ProductsController;
