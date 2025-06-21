const express = require('express')
const CategoryController = require('../controllers/categoryController')
const authMiddleware = require('../middleware/auth')
const multerMiddleware = require('../middleware/multer')

const router = express.Router();


router.post('/create',authMiddleware.auth, authMiddleware.isAdmin, multerMiddleware.single('image'), CategoryController.createCategory)
router.get('/gelAllCategories', CategoryController.getAllCategories)
router.get('/getCategoryByID/:id', CategoryController.getCategoryByID)
router.put('/updateCategory/:id',authMiddleware.auth, authMiddleware.isAdmin, CategoryController.updateCategory)
router.delete('/deleteCategory/:id',authMiddleware.auth,authMiddleware.isAdmin, CategoryController.deleteCategory)


module.exports = router;