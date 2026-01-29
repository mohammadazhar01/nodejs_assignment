const express = require('express')
const productController = require('../controllers/productController')

const route = express.Router()

route.get('/', productController.showAllProducts)
route.post('/', productController.addProduct)
route.get('/:productid', productController.showSingleProduct)
route.get('/delete/:productid', productController.removeProduct)
route.post('/update/:productid', productController.editProduct)
module.exports = route