const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.get('/', categoryController.showCategories)
router.post('/', categoryController.addCategory)
router.get('/:categoryid', categoryController.showSingleCategory)
router.get('/delete/:categoryid', categoryController.removeCategory)
router.post('/update/:categoryid', categoryController.editCategory)

module.exports = router