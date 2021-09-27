const mongoose = require('mongoose');
const {productModel} = require("../models/products.model.js");

class Product {
    constructor(){
    }

    async getProduct(id=false){
        try {
            await mongoose.connect("mongodb://localhost:27017/ecommerce");
            if (!id) {
                const data = await productModel.find();
                return data;
            }else{
                const data = await productModel.findById(id);
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
            await mongoose.connect("mongodb://localhost:27017/ecommerce");
            const newProduct = new productModel(data);
            const saved = await newProduct.save();
            return saved;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }finally{
            await mongoose.disconnect();
        }
    }

    async deleteProduct(id){
        try {
            await mongoose.connect("mongodb://localhost:27017/ecommerce"); 
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
            await mongoose.connect("mongodb://localhost:27017/ecommerce");
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