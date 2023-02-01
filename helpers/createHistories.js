const { Category, Product, User, History } = require('../models')

const createHistories = async (product, email, desc, next) => {
    try {
        let { id, name } = product
        await History.create({ productId: id, name, description: desc, updatedBy: email })
    } catch (error) {
        next(error)
    }
}

module.exports = { createHistories }