const { Category, Product, User, History } = require('../models')

class HistoryController {
    static async readHistories(req, res, next) {
        try {
            let histories = await History.findAll({
                order: [['id', 'desc']]
            })
            res.status(200).json({
                message: 'Success read histories',
                histories
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = HistoryController