const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');

class ProductsModel {
  static async getAllProducts() {
    const db = getDatabase();
    const productsCollection = db.collection('products');

    const products = await productsCollection
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: 'categoryId',
            as: 'category',
          },
        },
        {
          $sort: {
            stock: 1,
          },
        },
        {
          $project: {
            $sum: 1,
          },
        },
      ])
      .toArray();

    console.log(products);

    return products;
  }

  static async generateSummary() {
    const db = getDatabase();
    const productsCollection = db.collection('products');

    const summary = await productsCollection
      .aggregate([
        {
          $group: {
            _id: null,
            totalStock: {
              $sum: '$stock',
            },
            averageStock: {
              $avg: '$stock',
            },
          },
        },
      ])
      .toArray();

    console.log(summary);
  }
}

module.exports = ProductsModel;
