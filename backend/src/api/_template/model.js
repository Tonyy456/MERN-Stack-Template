/**
    @author: Anthony D'Alesandro

    A model for a database entry.
*/
const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    data1:{
        type: String,
        required: true,
    },
    data2: {
        type: String,
        required: true,
    },
    data3: {
        type: Number,
        required: true,
    }
})
// TODO: name entry here. lowercase singular prefered.
const model = mongoose.model('thing', schema)
module.exports = model