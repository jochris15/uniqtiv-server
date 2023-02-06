const { Category, Product, User, History } = require('../models')
const { createHistories } = require('../helpers/createHistories')
const { getPagination, getPagingData } = require('../helpers/pagination')
const { Op } = require('sequelize')

class ProductController {
    // CMS
    static async createProducts(req, res, next) {
        try {
            let email = req.user.email
            let { name, description, price, stock, imgUrl, categoryId } = req.body
            let product = await Product.create({ name, description, price, stock, imgUrl, categoryId, authorId: +req.user.id })
            createHistories(product, email, `New ${product.name} with id ${product.id} created`)
            res.status(201).json({
                message: 'Success create product',
                product
            })
        } catch (error) {
            next(error)
        }
    }

    static async readProducts(req, res, next) {
        try {
            let products = await Product.findAll({
                order: [['id', 'desc']],
                include: Category
            })
            res.status(200).json({
                message: 'Success read products',
                products
            })
        } catch (error) {
            next(error)
        }
    }

    static async readProductsById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let productId = req.params.id

            if (reg.test(productId) == false) throw { name: 'NotFound' }

            let product = await Product.findByPk(+productId, {
                include: [{
                    model: Category,
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    attributes: ['id', 'email', 'role']
                }]
            })

            if (!product) throw { name: 'NotFound' }

            res.status(200).json({
                message: 'Success read product',
                product
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductsById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let productId = req.params.id

            if (reg.test(productId) == false) throw { name: 'NotFound' }

            let detailProduct = await Product.findByPk(+productId)

            if (!detailProduct) throw { name: 'NotFound' }

            await Product.destroy({
                where: {
                    id: productId
                }
            })

            res.status(200).json({
                message: `${detailProduct.name} success to delete`
            })
        } catch (error) {
            next(error)
        }
    }

    static async readCategories(req, res, next) {
        try {
            let categories = await Category.findAll()
            res.status(200).json({
                message: 'Success read categories',
                categories
            })
        } catch (error) {
            next(error)
        }
    }

    static async patchStatusById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let status = req.body
            let productId = req.params.id
            let email = req.user.email

            if (reg.test(productId) == false) throw { name: 'NotFound' }

            let product = await Product.findByPk(+productId)

            if (!product) throw { name: 'NotFound' }

            let updatedStats = await Product.update(status, {
                where: {
                    id: +productId
                }
            })
            createHistories(product, email, `Product with id ${product.id} status has been updated from ${product.status} into ${status.status}`)
            res.status(200).json({
                message: `Success update status ${product.name} to ${status.status}`,
            })
        } catch (error) {
            next(error)
        }
    }

    static async editProductById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let { name, description, price, stock, imgUrl, categoryId } = req.body
            let productId = req.params.id
            let email = req.user.email

            if (reg.test(productId) == false) throw { name: 'NotFound' }

            let product = await Product.findByPk(+productId)

            if (!product) throw { name: 'NotFound' }

            let updatedProduct = await Product.update({ name, description, price, stock, imgUrl, categoryId, authorId: +req.user.id }, {
                where: {
                    id: +productId
                }
            })
            createHistories(product, email, `Product ${product.name} with id ${product.id} updated`)
            res.status(200).json({
                message: `Success update product ${product.name}`,
            })
        } catch (error) {
            next(error)
        }
    }

    // Public
    static async readProductsCustomer(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')

            const { page, size, search } = req.query

            if (reg.test(page) == false || page <= 0) throw { name: 'NotFound' }

            const { limit, offset } = getPagination(page, size)
            console.log(limit)
            const findProducts = await Product.findAndCountAll({
                where: {
                    status: "active",
                    name: {
                        [Op.iLike]: `%${search}%`
                    },
                },
                order: [['id', 'desc']],
                include: Category,
                limit: limit,
                offset: offset
            })
            const response = getPagingData(findProducts, page, limit)
            const { count: totalItems, rows: products } = findProducts
            res.status(200).json({
                response
            })
        } catch (error) {
            next(error)
        }
    }

    static async readProductsByIdCustomer(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let productId = req.params.id

            if (reg.test(productId) == false) throw { name: 'NotFound' }

            let product = await Product.findByPk(+productId, {
                include: {
                    model: Category,
                    attributes: ['id', 'name']
                }
            })

            if (!product) throw { name: 'NotFound' }

            res.status(200).json({
                message: 'Success read product',
                product
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController