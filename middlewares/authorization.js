const { Category, Product, User } = require('../models')

const authorization = async (req, res, next) => {
    try {
        let productId = +req.params.id
        let userRole = req.user.role

        if (userRole == 'Admin') {
            next()
        } else {
            let product = await Product.findByPk(productId)

            if (!product) throw { name: "NotFound" }

            if (product.authorId == req.user.id) next()

            else throw { name: 'Forbidden' }
        }
    } catch (error) {
        next(error)
    }
}

const authorizationStatus = async (req, res, next) => {
    try {
        let userRole = req.user.role

        if (userRole == 'Admin') {
            next()
        } else {
            throw { name: 'Forbidden' }
        }
    } catch (error) {
        next(error)
    }
}

const authorizationCustomer = async (req, res, next) => {
    try {
        let userRole = req.user.role

        if (userRole == 'Customer') {
            next()
        } else {
            throw { name: 'Forbidden' }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { authorization, authorizationStatus, authorizationCustomer }