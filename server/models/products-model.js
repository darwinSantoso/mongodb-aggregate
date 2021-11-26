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
      ])
      .toArray();

    return products;
  }

  static async getProductsByCategoryId(categoryId) {
    const db = getDatabase();
    const productsCollection = db.collection('products');

    const products = await productsCollection
      .aggregate([
        {
          $match: {
            categoryId: Number(categoryId),
          },
        },
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
      ])
      .toArray();

    return products;
  }

  static async generateSummary(categoryId) {
    const db = getDatabase();
    const productsCollection = db.collection('products');
    let summary;

    if (categoryId) {
      summary = await productsCollection
        .aggregate([
          {
            $match: {
              categoryId: Number(categoryId),
            },
          },
          {
            $group: {
              _id: null,
              totalStock: {
                $sum: '$stock',
              },
              averageStock: {
                $avg: '$stock',
              },
              maxStock: {
                $max: '$stock',
              },
              min: {
                $min: '$stock',
              },
            },
          },
        ])
        .toArray();
    } else {
      summary = await productsCollection
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
              maxStock: {
                $max: '$stock',
              },
              min: {
                $min: '$stock',
              },
            },
          },
        ])
        .toArray();
    }

    console.log(summary);

    return summary;
  }
}

module.exports = ProductsModel;
