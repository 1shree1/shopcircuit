const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/adminfile")

const adminSchema = mongoose.Schema({
    role : String, 
    email : String,
    password : String
})

module.exports = mongoose.model("admin", adminSchema)