const express = require('express')
const app = express()
const mongodb = require('./db')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary')

//configuring env
dotenv.config()

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cookieParser())

app.use(express.json())

//connecting to database
mongodb();

//Adding Routes
app.use('/api/v1', require('./routes/userRoutes'))
app.use('/api/v1', require('./routes/blogRoutes'))

//Listening Server
app.listen(process.env.PORT, () => {
    console.log("Server running at port 5000")
})