const { verifyToken } = require("../helpers/jwt")
const { Category, Product, User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers

        if (!access_token) throw { name: 'NoToken' }

        let payload = verifyToken(access_token)
        let user = await User.findByPk(payload.id)

        if (!user) throw { name: 'Unauthorized' }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication }