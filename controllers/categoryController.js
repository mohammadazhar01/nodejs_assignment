const categoryModel = require('../models/categoryModel')

exports.showCategories = async(req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        console.log(categories)
        res.json(categories)
        res.render('categories', {categories, message: categories.length === 0 ? "No categories found": null})
    } catch(error) {
        console.log(error)
        res.send("Error loading categories")
    }
}

exports.addCategory = async(req, res) => {
    try {
        const {categoryName} = req.body

        if(!categoryName) {
            return res.send("Category Name required!")
        }

        await categoryModel.insertCategory(categoryName)

        res.redirect('/categories')
    } catch(error) {
        console.log(error)
        res.send("Error adding category")
    }
}

exports.removeCategory = async(req, res) => {
    try {
        const {categoryid} = req.params
        const category = await categoryModel.getCategoryById(categoryid);

        if(!category){
            return res.send("Category does not exist")
        }

        await categoryModel.deleteCategory(categoryid)
        res.redirect('/categories')
    } catch(error){
        console.log(error)
        res.send("Error  deleting category")
    }
}


exports.showSingleCategory = async(req, res) => {
    try {
        const {categoryid} = req.params
        const category = await categoryModel.getCategoryById(categoryid);

        if(!category){
            return res.send("Category not found")
        }

        res.json(category)
        res.render('categorydetails', {category})
    } catch(error) {
        console.log(error)
        res.send("Error fetching category")
    }
}

exports.editCategory = async(req, res) => {
    try {
        const {categoryid} = req.params
        const {categoryName} = req.body
        const category = await categoryModel.getCategoryById(categoryid);

        if(!category){
            return res.send("Category not found")
        }

        await categoryModel.updateCategory(categoryid, categoryName)
        res.redirect('/categories')
    } catch(error) {
        console.log(error)
        res.send("Error updating category")
    }
}