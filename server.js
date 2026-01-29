const express = require('express')
const dotenv = require('dotenv')
const db = require('./config/db')
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')

dotenv.config()

const port = process.env.PORT || 4000
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.redirect('/api/categories')
})

app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)

const startServer = async () => {
    try {
        await db.query("SELECT 1")
        console.log("Database connected")

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error("Database connection failed:", error)
    }
}


startServer()
