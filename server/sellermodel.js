const mongoose = require('mongoose')

const sellerSchema = mongoose.Schema({
    role : {type: String, required : true}, 
    name : {type: String, required : true},
    address : {type: String, required : true},
    contact : {type: String, required : true},
    email : {type: String, required : true, unique: true},
    password : {type: String, required : true},
    category : {type: String, required : true},
    product : [
        {type: mongoose.Schema.Types.ObjectId,
            ref : "product"
        }
    ]
})

module.exports = mongoose.model("seller", sellerSchema)