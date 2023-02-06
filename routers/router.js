const router = require('express').Router()
const productRouter = require('./product')
const userRouter = require('./user')
const historyRouter = require('./history')
const publicRouter = require('./public')
const { authentication } = require('../middlewares/authentication')

// User
router.use('/users', userRouter)

// Product
router.use('/products', authentication, productRouter)

// History
router.use('/histories', authentication, historyRouter)

// Public
router.use('/pub', publicRouter)

module.exports = router