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

        console.log(products, categories, page, totalPages)

        res.json(products, categories, totalPages, page)
        /*res.send('product',{products, categories, totalPages, page, 
            productMessage: products.length === 0 ? "No products found" : null,
           categoryMessage: categories.length === 0 ? "No category found" : null}) */
    }catch(error){
        res.send("Error loading products")
        console.log(error)
    }
}

exports.addProduct = async(req, res)=> {
    try {
        const {productname, categoryid} = req.body
        if(!productname || !categoryid){
            res.send("Product Name and Product Id is required")
        }
        await productModel.insertProduct(productname,categoryid)
        res.redirect('/products')
    } catch(error){
        res.send("Error adding product")
        console.log(error)
    }
}

exports.showSingleProduct = async(req, res) => {
    try {
        const {productid} = req.params
        const product = await productModel.getProductById(productid);

        if(!product){
            return res.send("Product not found")
        }

        res.json(product)
        res.render('productdetails', {product})
    } catch(error) {
        console.log(error)
        res.send("Error fetching product")
    }
}

exports.removeProduct = async(req, res) => {
    try {
        const {productid} = req.params
        const product = await productModel.getProductById(productid);

        if(!product){
            return res.send("Product does not exist")
        }
        console.log(productid)

        await productModel.deleteProduct(productid)
        res.redirect('/products')
    } catch(error){
        console.log(error)
        res.send("Error deleting product")
    }
}

exports.editProduct = async(req, res) => {
    try {
        const {productName, categoryId} = req.body
        const productid = req.params.productid

        const product = await productModel.getProductById(productid);

        if(!product){
            return res.send("Product not found")
        }
        console.log(productid)
        await productModel.updateProduct(productid, productName, categoryId)
        res.redirect('/products')
    } catch(error){
        console.log(error)
        res.send("Error updating product")
    }
    
    
}



