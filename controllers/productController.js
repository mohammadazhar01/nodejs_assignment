const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')

exports.showAllProducts = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const offset = (page - 1) * limit

        const products = await productModel.getAllProducts(limit, offset)

        const total = await productModel.getProductCount()

        const categories = await categoryModel.getAllCategories()

        const totalPages = Math.ceil(total / limit)

        res.render('products',{products, categories, totalPages, page, 
            productMessage: products.length === 0 ? "No products found" : null,
           categoryMessage: categories.length === 0 ? "No category found" : null}) 
    }catch(error){
        res.send("Error loading products")
        console.log(error)
    }
}

exports.showAddProductForm = async(req, res) => {
    const categories = await categoryModel.getAllCategories()
    res.render('addProduct', {categories})
}

exports.addProduct = async(req, res)=> {
    try {
        const {productname, categoryid} = req.body
        if(!productname || !categoryid){
            res.send("Product Name and Product Id is required")
        }
        await productModel.insertProduct(productname,categoryid)

        res.redirect('/api/products')
    } catch(error){
        res.send("Error adding product")
        console.log(error)
    }
}

exports.showSingleProduct = async(req, res) => {
    try {
        const {productid} = req.params
        const product = await productModel.getProductById(productid);
        const categories = await categoryModel.getAllCategories()

        if(!product){
            return res.send("Product not found")
        }

        res.render('updateProduct', {product, categories})
    } catch(error) {
        console.log(error)
        res.send("Error fetching product")
    }
}


exports.editProduct = async(req, res) => {
    try {
        const {productname, categoryid} = req.body
        const productid = req.params.productid

        const product = await productModel.getProductById(productid);

        if(!product){
            return res.send("Product not found")
        }
        await productModel.updateProduct(productid, productname, categoryid)
        res.redirect('/api/products')
    } catch(error){
        console.log(error)
        res.send("Error updating product")
    }
    
    
}

exports.removeProduct = async(req, res) => {
    try {
        const {productid} = req.params
        const product = await productModel.getProductById(productid);

        if(!product){
            return res.send("Product does not exist")
        }

        await productModel.deleteProduct(productid)
        res.redirect('/api/products')
    } catch(error){
        console.log(error)
        res.send("Error deleting product")
    }
}