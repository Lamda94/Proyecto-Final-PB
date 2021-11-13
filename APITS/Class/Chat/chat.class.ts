import mongoose from 'mongoose';
import {IMenssage} from '../Interfaces/menssageInterface';
const { menssageModel } = require("../../models/menssage.model");
require('dotenv').config();
const muri:any = process.env.MONGO_URI;
class Chat{ 
    private MDBURI = muri;
    constructor(){
    }

    async getMenssage(): Promise<IMenssage[]>{
        try {
            let i = 1;
            await mongoose.connect(this.MDBURI);
            const response = await menssageModel.find();            
            const data:IMenssage[] = response.map((menssage:any)=>{
                const data = {
                    id: i++,
                    author:{
                        id: i,
                        name:menssage.author.name,
                        lastname:menssage.author.lastname,
                        age:menssage.author.age,
                        nickname:menssage.author.nickname,
                        avatar:menssage.author.avatar,
                    },
                    text:menssage.text
                }
                return data;
            });
            return data;
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }                    
    }

    async addMenssage(data:any):Promise<IMenssage>{    
        try {
            await mongoose.connect(this.MDBURI);            
            await menssageModel.insertMany(data);
            const response = menssageModel.find().sort({$natural:-1}).limit(1);
            const menssage = {
                id: response._id,
                author:{
                    name:response.author.name,
                    lastname:response.author.lastname,
                    age:response.author.age,
                    nickname:response.author.nickname,
                    avatar:response.author.avatar,
                },
                text:response.text
            }
            return menssage;
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }    
    }
}

const chatMenssage = new Chat();

module.exports = {chatMenssage};