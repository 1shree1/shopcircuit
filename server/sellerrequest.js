const mongoose = require('mongoose')

const newSellerSchema = mongoose.Schema({
    role : {type: String, required : true}, 
    name : {type: String, required : true},
    address : {type: String, required : true},
    contact : {type: String, required : true},
    email : {type: String, required : true, unique: true},
    password : {type: String, required : true},
    category : {type: String, required : true},
})

module.exports = mongoose.model("newSeller", newSellerSchema)