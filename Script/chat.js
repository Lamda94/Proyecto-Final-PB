const mongoose = require('mongoose');
const {menssageModel} = require("../models/menssage.model.js");
require('dotenv').config();

class Chat{ 
    constructor(){
        this.MDBURI=process.env.MONGO_URI;
    }

    async getMenssage(){
        try {
            await mongoose.connect(this.MDBURI);
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
            await mongoose.connect(this.MDBURI);            
            const menssage = menssageModel.insertMany(data);
            return menssage;
        } catch (err) {
            console.log(err);
        }finally{
            await mongoose.disconnect();
        }    
    }
}

const chatMenssage = new Chat();

module.exports = {chatMenssage};