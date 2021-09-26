const mongoose = require('mongoose');
const {menssageModel} = require("../models/menssage.model.js");

class File{ 
    constructor(){}

    async getMenssage(){
        try {
            await mongoose.connect("mongodb://localhost:27017/ecommerce");
            const data = await menssageModel.find();            
            return data;
        } catch (err) {
            console.log(err);
        }finally{
            await mongoose.disconnect();
        }                    
    }

    async addMenssage(data){    
        try {
            await mongoose.connect("mongodb://localhost:27017/ecommerce");

            const dataMensage = {
                email:data.email, 
                menssage:data.menssage,
            };
            
            const newMenssage = new menssageModel(dataMensage);

            const menssage = await newMenssage.save();

            return menssage;
        } catch (err) {
            console.log(err);
        }finally{
            await mongoose.disconnect();
        }    
    }
}

const chatMenssage = new File();

module.exports = {chatMenssage};