const { OAuth2Client } = require('google-auth-library')
const { Category, Product, User } = require('../models')
const { hashPassword, compareHash } = require('../helpers/bcrypt')
const { createToken, verifyToken } = require('../helpers/jwt')

class UserController {
    // CMS
    static async createUsers(req, res, next) {
        try {
            let { email, password, phoneNumber, address } = req.body
            let user = await User.create({ email, password, role: 'Admin', phoneNumber, address })
            res.status(201).json({
                message: 'Success create new user'
            })
        } catch (error) {
            next(error)
        }
    }


    static async loginUsers(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: "EmailPassEmpty" }

            const findUser = await User.findOne({
                where: {
                    email,
                },
            })

            if (!findUser) throw { name: 'invalid_email/password' }

            const comparePass = compareHash(password, findUser.password)

            if (!comparePass) throw { name: 'invalid_email/password' }

            const payload = {
                id: findUser.id,
            }

            const username = findUser.email.substring(0, findUser.email.indexOf('@'))

            const access_token = createToken(payload)
            res.status(200).json({
                access_token: access_token, id: findUser.id, username, email: findUser.email, role: findUser.role
            })
        } catch (error) {
            next(error)
        }
    }

    static async googleSignIn(req, res, next) {
        try {
            const { token_google } = req.headers

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    email: payload.email,
                    password: "password_google",
                    role: "Staff",
                    phoneNumber: "Google_phone_number",
                    address: "Google_address"
                },
                hooks: false,
            })

            const username = user.email.substring(0, user.email.indexOf('@'))

            const access_token = createToken({ id: user.id })
            res.status(200).json({
                access_token: access_token, id: user.id, username, email: user.email, role: user.role
            })
        } catch (error) {
            next(error)
        }
    }

    // Public
    static async createCustomers(req, res, next) {
        try {
            let { email, password, phoneNumber, address } = req.body
            let user = await User.create({ email, password, role: 'Customer', phoneNumber, address })
            res.status(201).json({
                message: 'Success create new public user'
            })
        } catch (error) {
            next(error)
        }
    }

    static async googleSignInCustomer(req, res, next) {
        try {
            const { token_google } = req.headers

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    email: payload.email,
                    password: "password_google",
                    role: "Customer",
                    phoneNumber: "Google_phone_number",
                    address: "Google_address"
                },
                hooks: false,
            })

            const username = user.email.substring(0, user.email.indexOf('@'))
            const access_token = createToken({ id: user.id })
            res.status(200).json({
                access_token: access_token, username, id: user.id, email: user.email, role: user.role
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController