const express = require('express')
const productController = require('../controllers/productController')

const route = express.Router()

route.get('/', productController.showAllProducts)
route.get('/add', productController.showAddProductForm)
route.post('/add', productController.addProduct)
route.get('/edit/:productid', productController.showSingleProduct)
route.post('/update/:productid', productController.editProduct)
route.get('/delete/:productid', productController.removeProduct)
module.exports = route