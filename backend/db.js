const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const URI = process.env.URI

const mongodb = async()=> {
    await mongoose.connect(URI).then(()=>{
        console.log("Database connected successfully")
    }).catch(()=>{
        console.log("Error while connecting to Database")
    })
}

module.exports = mongodb

