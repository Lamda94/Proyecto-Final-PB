const mongoose = require('mongoose');
const {menssageModel} = require("../models/menssage.model.js");
require('dotenv').config();

class Chat{ 
    constructor(){
        this.MDBURI=process.env.MONGO_URI;
    }

    async getMenssage(){
        try {
            let i = 0;
            await mongoose.connect(this.MDBURI);
            const d = await menssageModel.find(); 
            const data = d.map(doc=>{
                    return {
                        id: i++,
                        author:{
                            id:doc.author.id,
                            name: doc.author.name,
                            lastname: doc.author.lastname,
                            age: doc.author.age,
                            nickname: doc.author.nickname,
                            avatar: doc.author.avatar
                        },
                        text: doc.text,
                    }
            });           
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
            const menssage = await menssageModel.insertMany(data);
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