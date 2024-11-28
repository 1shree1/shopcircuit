const mongoose = require('mongoose')

const accpetedOrdersSchema = mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type:String, required:true},
    productname: {type: String, required : true},
    contact: {type: String, required : true},
    price : {type: String, required: true},
    location: {type: String, require: true},
})

module.exports = mongoose.model("acceptedOrder", accpetedOrdersSchema)
