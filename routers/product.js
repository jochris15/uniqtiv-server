const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authorization, authorizationStatus } = require('../middlewares/authorization')

// Admin/Staff
router.post('/', ProductController.createProducts)
router.get('/', ProductController.readProducts)
router.get('/categories', ProductController.readCategories)
router.get('/:id', ProductController.readProductsById)
router.delete('/:id', authorization, ProductController.deleteProductsById)
router.patch('/:id', authorizationStatus, ProductController.patchStatusById)
router.put('/:id', authorization, ProductController.editProductById)



module.exports = router