import mongoose from 'mongoose';
 const { Schema, model } = mongoose;
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

const productModel = model("products", productSchema);

export default productModel;