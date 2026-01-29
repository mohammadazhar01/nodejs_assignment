# Node.js Assignment

A CRUD operations based application built using **Node.js, Express, EJS, and MySQL**.  
This project demonstrates relational database handling, server-side pagination, and MVC architecture.

---

## Features

### Category Master
- Add Category  
- View Categories  
- Edit Category  
- Delete Category  

### Product Master
- Add Product  
- View Products  
- Edit Product  
- Delete Product  
- Each product belongs to a category  

## Project Structure

```
project-root/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── categoryController.js
│   └── productController.js
│
├── models/
│   ├── categoryModel.js
│   └── productModel.js
│
├── routes/
│   ├── categoryRoute.js
│   └── productRoute.js
│
├── views/
│   ├── categories.ejs
│   ├── addCategory.ejs
│   ├── updateCategory.ejs
│   ├── products.ejs
│   ├── addProduct.ejs
│   └── updateProduct.ejs
│
├── server.js
└── README.md
```

---

##  Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Database

Create a MySQL database and run:

```sql
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
```

Create .env file and create env variables:

```
PORT = 4000

DB_HOST = localhost
DB_USER = root
DB_PASSWORD = yourdbpassword
DB_NAME = test_db
DB_PORT = 3307

```

---

### 3️⃣ Run the Server

```bash
node server.js
```

Server will run on:

```
http://localhost:4000
```

---

##  Routes Overview

### Category Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/categories | List categories |
| GET | /api/categories/add | Show add form |
| POST | /api/categories/add | Add category |
| GET | /api/categories/edit/:id | Edit form |
| POST | /api/categories/update/:id | Update category |
| GET | /api/categories/delete/:id | Delete category |

### Product Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/products | List products (paginated) |
| GET | /api/products/add | Show add form |
| POST | /api/products/add | Add product |
| GET | /api/products/edit/:id | Edit form |
| POST | /api/products/update/:id | Update product |
| GET | /api/products/delete/:id | Delete product |

---

## 👨‍💻 Author

**Sheikh Md Azhar**

    
