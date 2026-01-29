/* Create database */
CREATE DATBASE IF NOT EXISTS test_db;

USE test_db;

/*Create category table */
CREATE TABLE categories(
    CategoryId INT PARIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(100) NOT NULL
);

/*Create products table */
CREATE TABLE products (
    ProductId INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    CategoryId INT,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);