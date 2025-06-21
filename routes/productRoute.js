const express = require('express')
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/auth')
const multerMiddleware = require('../middleware/multer')

const router = express.Router();


router.post('/create',authMiddleware.auth,multerMiddleware.single('image'), productController.createProduct)
router.get('/gelAllProducts', productController.getAllProducts)
router.get('/getProductByID/:id', productController.getProductByID)
router.put('/updateProduct/:id',authMiddleware.auth, productController.updateProduct)
router.delete('/deleteProduct/:id',authMiddleware.auth, productController.deleteProduct)
router.get('/getProductsByCategory',productController.getProductsByCategory)
router.get('/getProductsByQuery',productController.getProductsByQuery)




module.exports = router;