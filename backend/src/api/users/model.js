/*
    Author: Anthony D'Alesandro

    user.model.js - the model representing a single user.
*/
const mongoose = require("mongoose")
const CollectionName = 'users' // lowercase, make plural
const UserSchema = mongoose.Schema({
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
}, 
{ collection: CollectionName })
const User = mongoose.model(CollectionName, UserSchema)
module.exports = User