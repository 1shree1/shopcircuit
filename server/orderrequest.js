const mongoose = require('mongoose')

const orderRequestSchema = mongoose.Schema({
    name : {type: String, required: true},
    productname: {type: String, required : true},
    contact: {type: String, required : true},
    price : {type: String, required: true},
    location: {type: String, require: true},
    description:{type: String, required: true},
    image : {type: Buffer, required: true},
    category: {type: String, required: true},
    date: {type:Date, default: Date.now()}
})

module.exports = mongoose.model("orderRequest", orderRequestSchema)
