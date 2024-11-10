const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    img : {type: Buffer, required : true},
    productname : {type: String, required : true},
    category : {type: String, required : true},
    model : {type: String, required : true},
    price : {type: String, required : true},
    description : {type: String, required : true},
    date : {
        type: Date,
        default : Date.now
    },
    seller : {type : mongoose.Schema.Types.ObjectId,
        ref: "seller"
    }
})
module.exports= mongoose.model("product", productSchema)