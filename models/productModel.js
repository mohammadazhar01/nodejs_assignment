const db = require('../config/db')


exports.getAllProducts = async(limit, offset) => {
    const [rows] = await db.query(`SELECT p.ProductId, p.ProductName, c.CategoryName, c.CategoryId 
        FROM products p JOIN categories c ON p.CategoryId = c.CategoryId`)
    return rows
}

exports.getProductCount = async() => {
    const [rows] = await db.query('SELECT COUNT(*) AS total FROM Products')
    return rows[0].total
}

exports.insertProduct = async(name, categoryId) => {
    await db.query('INSERT INTO products(ProductName, CategoryId) VALUES(?,?)',[name, categoryId])
}

exports.getProductById = async(productId) => {
    const [rows] = await db.query("SELECT * FROM products WHERE ProductId = ?", [productId]);
    return rows[0]
}

exports.deleteProduct = async(productId) => {
    await db.query('DELETE FROM products WHERE ProductId = ?', [productId]);
}

exports.updateProduct = async(productId, productName, categoryId) => {
    await db.query('UPDATE products SET ProductName=?, CategoryId=? WHERE ProductId=? ', [productName, categoryId, productId])
}