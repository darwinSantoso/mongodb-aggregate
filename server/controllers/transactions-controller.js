const TransactionsModel = require('../models/transactions-model');

class TransactionsController {
  static async findTransactionByStatus(req, res, next) {
    try {
      const transactions = await TransactionsModel.groupTransactionsByStatus(
        req.body
      );

      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }

  static async getTransactionRevenues(req, res, next) {
    try {
      const transactions = await TransactionsModel.getRevenueOnTransaction();

      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }

  static async generateTransactionsSummary(req, res, next) {
    try {
      const transactions =
        await TransactionsModel.generateTransactionsSummary();

      res.status(200).json(transactions);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = TransactionsController;
