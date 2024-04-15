/**
    @author: Anthony D'Alesandro

    A model for a database entry.
*/
const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})
const model = mongoose.model('users', schema)
module.exports = model