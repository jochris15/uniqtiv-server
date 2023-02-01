const router = require('express').Router()
const ProductController = require('../controllers/productController')
const WishlistController = require('../controllers/wishlistController')
const UserController = require('../controllers/userController')
const { authorizationCustomer } = require('../middlewares/authorization')
const { authentication } = require('../middlewares/authentication')

// User 
router.post('/users/register', UserController.createCustomers)
router.post('/users/login', UserController.loginUsers)
router.post('/users/googleSignIn', UserController.googleSignInCustomer)

// Product
router.get('/products', ProductController.readProductsCustomer)
router.get('/products/:id', ProductController.readProductsByIdCustomer)

// Middleware
router.use(authentication)

// Wishlist
router.get('/wishlist', authorizationCustomer, WishlistController.readWishlists)
router.post('/wishlist/:productId', authorizationCustomer, WishlistController.createWishlist)
router.delete('/wishlist/:wishlistId', authorizationCustomer, WishlistController.deleteWishlistById)

module.exports = router