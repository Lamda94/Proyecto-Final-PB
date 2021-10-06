const mongoose = require('mongoose');
const {productModel} = require("../../models/products.model.js");
require('dotenv').config();
class Product {
    constructor(){
        this.MDBURI=process.env.MONGO_URI_LOCAL;
    }

    async getProduct(id=false){
        try {
            await mongoose.connect(this.MDBURI);
            if (!id) {
                const data = [];
                const d = await productModel.find();
                for (const product of d) {
                    data.push({
                        id: product._id,        
                        name:product.name,
                        description:product.description,
                        code: Number(product.code),
                        picture:product.picture,
                        price: Number(product.price),
                        stock: Number(product.stock),
                    });
                }
                return data;
            }else{
                const d = await productModel.findById(id);
                const data ={
                        id: d._id,        
                        name:d.name,
                        description:d.description,
                        code: Number(d.code),
                        picture:d.picture,
                        price: Number(d.price),
                        stock: Number(d.stock),
                    };
                return data;
           }
        } catch (error) {
            return []
        }finally{
            await mongoose.disconnect();
        }
    }

    async saveProduct(data){
        try {
            await mongoose.connect(this.MDBURI);
            const saved = await productModel.insertMany(data);
            return saved;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }finally{
            await mongoose.disconnect();
        }
    }

    async deleteProduct(id){
        try {
            await mongoose.connect(this.MDBURI); 
            const deleted = await productModel.deleteOne({_id: id});
            return deleted;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }finally{
            await mongoose.disconnect();
        }    
    }

    async updateProduct(data, id){        
        try {
            await mongoose.connect(this.MDBURI);
            const updated = await productModel.updateMany({_id:id}, data);
            return updated;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }finally{
            await mongoose.disconnect();
        }           
    }
}

const product = new Product();

module.exports = {product};