/**
    @author: Anthony D'Alesandro

    A model for a database entry.
*/
const mongoose = require("mongoose")
const RefreshTokenObjectSchema = new mongoose.Schema({
    token: String,
    machineID: String,
    creationDate: Date
});

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
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
    },
    refreshTokens: [RefreshTokenObjectSchema]
})
const model = mongoose.model('users', schema)
module.exports = model