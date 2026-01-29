const db = require('../config/db')

exports.getAllCategories = async() => {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
}

exports.insertCategory = async(categoryName) => {
    await db.query('INSERT INTO categories(CategoryName) VALUES(?)', [categoryName]);
}

exports.deleteCategory = async(categoryId) => {
    await db.query('DELETE FROM categories WHERE CategoryId = ?', [categoryId]);
}

exports.getCategoryById = async(categoryId) => {
    const [rows] = await db.query('SELECT * FROM categories WHERE CategoryId = ?', [categoryId]);
    return rows[0]
}

exports.updateCategory = async(categoryId, categoryName) => {
    await db.query('UPDATE categories SET CategoryName = ? WHERE CategoryId = ?', [categoryName,categoryId]);
} 

exports.getProductCountInCategory = async(categoryId) =>{
    const [rows] = await db.query('SELECT COUNT(*) AS totalproducts FROM products WHERE CategoryID = ?', [categoryId])
    return rows[0].totalproducts
}