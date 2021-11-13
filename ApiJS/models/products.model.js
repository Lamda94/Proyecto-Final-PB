const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    timestamp: {
        type: Date, 
        default: Date.now 
    },
    name: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    code: {
        type:Number,
        required:true,
    },
    picture: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    stock: {
        type:Number,
        required:true,
    },
});

const productModel = mongoose.model("products", productSchema);

module.exports = { productModel };