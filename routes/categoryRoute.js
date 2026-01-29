const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.get('/', categoryController.showCategories)
router.get('/add', categoryController.showAddCategoryForm)
router.post('/add', categoryController.addCategory)
router.get('/edit/:categoryid', categoryController.showSingleCategory)
router.post('/update/:categoryid', categoryController.editCategory)
router.get('/delete/:categoryid', categoryController.removeCategory)

module.exports = router