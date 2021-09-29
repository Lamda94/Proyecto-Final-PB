const mongoose = require('mongoose');
const {menssageModel} = require("../models/menssage.model.js");
require('dotenv').config();

class File{ 
    constructor(){
        this.MDBURI=process.env.MONGO_URI;
        console.log(this.MDBURI);
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

            const dataMensage = {
                email:data.email, 
                menssage:data.menssage,
            };
            
            const menssage = menssageModel.insertMany(dataMensage);

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