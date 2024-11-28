const mongoose = require('mongoose')

const newOrderSchema = mongoose.Schema({
    name: {type: String, required : true},
    address: {type: String, required : true},
    contact: {type: String, required : true},
    email: {type: String, required : true},
    location: {type: String, require: true},
    productOrdered: {
        type: String, require: true
    },
    sellerOfProduct:{
        type: String, require: true
    }
})

module.exports = mongoose.model("newOrder", newOrderSchema)