const categoryModel = require('../models/categoryModel')

exports.showCategories = async(req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        
        res.render('categories', {categories})
    } catch(error) {
        console.log(error)
        res.send("Error loading categories")
    }
}

exports.showAddCategoryForm = async(req,res) => {
    res.render('addCategory')
}

exports.addCategory = async(req, res) => {
    try {
        const {categoryname} = req.body

        if(!categoryname) {
            return res.send("Category Name required!")
        }

        await categoryModel.insertCategory(categoryname)

        res.redirect('/api/categories')
    } catch(error) {
        console.log(error)
        res.send("Error adding category")
    }
}


exports.showSingleCategory = async(req, res) => {
    try {
        const {categoryid} = req.params
        const category = await categoryModel.getCategoryById(categoryid);

        if(!category){
            return res.send("Category not found")
        }
        res.render('updateCategory', {category})
    } catch(error) {
        console.log(error)
        res.send("Error fetching category")
    }
}

exports.editCategory = async(req, res) => {
    try {
        const {categoryid} = req.params
        const {categoryname} = req.body
        const category = await categoryModel.getCategoryById(categoryid);

        if(!category){
            return res.send("Category not found")
        }

        await categoryModel.updateCategory(categoryid, categoryname)
        res.redirect('/api/categories')
    } catch(error) {
        console.log(error)
        res.send("Error updating category")
    }
}

exports.removeCategory = async(req, res) => {
    try {
        const {categoryid} = req.params
        const category = await categoryModel.getCategoryById(categoryid);

        const productCount = await categoryModel.getProductCountInCategory(categoryid)

        if(!category){
            return res.send("Category does not exist")
        }

        if(productCount > 0){
            return res.send("Cannot delete category, products already exist in this category")
        }

        await categoryModel.deleteCategory(categoryid)

        res.redirect('/api/categories')
    } catch(error){
        console.log(error)
        res.send("Error  deleting category")
    }
}
