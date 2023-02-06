const { Category, Product, User, History, Wishlist } = require('../models')
const axios = require("axios");

class WishlistController {
    static async readWishlists(req, res, next) {
        try {
            let wishlist = await Wishlist.findAll({
                include: {
                    model: Product,
                    include: Category,
                },
                order: [['id', 'desc']],
                where: {
                    authorId: +req.user.id
                }
            })
            res.status(200).json({
                message: 'Success read wishlist',
                wishlist
            })
        } catch (error) {
            next(error)
        }
    }

    static async createWishlist(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let productId = +req.params.productId

            if (reg.test(productId) == false) throw { name: 'NotFound' }

            let product = await Product.findByPk(productId)

            if (!product) throw { name: 'NotFound' }

            const [wishlist, created] = await Wishlist.findOrCreate({
                where: { productId: productId },
                where: { productId: productId, authorId: +req.user.id },
                defaults: {
                    authorId: +req.user.id,
                    productId: productId,
                }
            })

            if (!created) throw { name: 'wishlisted' }

            res.status(201).json({
                message: `Product with id ${productId} wishlisted`,
                wishlist
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteWishlistById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let wishlistId = req.params.wishlistId

            if (reg.test(wishlistId) == false) throw { name: 'NotFound' }

            let findWishlist = await Wishlist.findByPk(+wishlistId)

            if (!findWishlist) throw { name: 'NotFound' }

            await Wishlist.destroy({
                where: {
                    id: wishlistId
                }
            })

            res.status(200).json({
                message: `Wishlist with id ${findWishlist.id} success to delete`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = WishlistController