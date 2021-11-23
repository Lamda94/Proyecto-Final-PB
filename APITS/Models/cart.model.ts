import mongoose from 'mongoose';
 const { Schema } = mongoose;
 const cartSchema = new Schema({
    timestamp: {
        type: Date, 
        default: Date.now 
    },
    products: {
        type:Array,
        required:true,
    },
});

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;