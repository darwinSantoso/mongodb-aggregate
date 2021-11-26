const { getDatabase } = require('../config/mongo');

class TransactionsModel {
  static async groupTransactionsByStatus(reqBody) {
    const { status } = reqBody;

    const db = getDatabase();
    const transactionsCollection = db.collection('transactions');

    const transactions = await transactionsCollection
      .aggregate([
        { $match: { status: status } },
        { $group: { _id: '$_id', totalQuantity: { $sum: '$qty' } } },
      ])
      .toArray();

    return transactions;
  }

  static async getRevenueOnTransaction() {
    const db = getDatabase();
    const transactionsCollection = db.collection('transactions');

    const transactions = await transactionsCollection
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'name',
            foreignField: 'productName',
            as: 'product',
          },
        },
        {
          $project: {
            product: {
              $arrayElemAt: ['$product', 0],
            },
            transaction_qty: '$qty',
            buyer: '$buyerName',
          },
        },
        {
          $project: {
            revenue: {
              $multiply: ['$transaction_qty', '$product.price'],
            },
            buyer: '$buyer',
          },
        },
      ])
      .toArray();

    return transactions;
  }

  static async generateTransactionsSummary() {
    const db = getDatabase();
    const transactionsCollection = db.collection('transactions');

    const summary = await transactionsCollection
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'name',
            foreignField: 'productName',
            as: 'product',
          },
        },
        {
          $project: {
            product: {
              $arrayElemAt: ['$product', 0],
            },
            transaction_qty: '$qty',
            buyer: '$buyerName',
          },
        },
        {
          $project: {
            revenue: {
              $multiply: ['$transaction_qty', '$product.price'],
            },
            buyer: '$buyer',
            productName: '$product.name',
            productQuantity: '$transaction_qty',
          },
        },
        {
          $group: {
            _id: null,
            bestSellingProduct: {
              $max: '$productQuantity',
            },
            averageRevenue: {
              $avg: '$revenue',
            },
            maxRevenue: {
              $max: '$revenue',
            },
            minRevenue: {
              $min: '$revenue',
            },
          },
        },
      ])
      .toArray();

    const bestSellingItem = await transactionsCollection
      .aggregate([
        {
          $sort: {
            qty: -1,
          },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            product: '$productName',
            amount: '$qty',
          },
        },
      ])
      .toArray();

    return {
      summary,
      bestSellingItem,
    };
  }
}

module.exports = TransactionsModel;
