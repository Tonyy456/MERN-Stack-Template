/*
    Author: Anthony D'Alesandro

    db.js - setsup mongodb access. 
    - mongoose is mongodb but with enforced schemas and more abstraction.
    - mongoose is a javascript helper to make request more intuitive and friendly.
    - module.export is a function that asynchronously sets up the database.
*/

const mongoose = require('mongoose'); 
require("dotenv").config();

const connectToMongoose = async()=>{
    mongoose.connection.on('close', () => console.log('CONNECTION CLOSED'));
    try {
        const con = await mongoose
            .connect(process.env.MONGODB_URI); 
        console.log(`Database connected. Host: ${con.connection.host}`)
    } 
    catch (error) {
        throw new Error(error)
    }
}

module.exports = connectToMongoose