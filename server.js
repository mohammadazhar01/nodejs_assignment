const express = require('express')
const dotenv = require('dotenv')
const db = require('./config/db')

dotenv.config()

const port = process.env.PORT || 4000
const app = express()
const startServer = async() => {
    try {
        await db.query("SELECT 1")
        console.log("Database connected")

        app.listen(port, ()=> {
        console.log(`Sever is running on ${port} port`)
    })
    } catch(error) {
        res.send("Database connection failed", error)
    }
    
}

startServer()
