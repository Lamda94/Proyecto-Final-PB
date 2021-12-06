import mongoose from 'mongoose';
const { userModel } = require("../Models/user.model");
require('dotenv').config();
const muri:any = process.env.MONGO_URI;
class User{ 
    private MDBURI = muri;
    constructor(){
    }

    async getUser(name:any = false): Promise<[]>{
        try {
            console.log("entro a getUser:",name);            
            let i = 1;
            await mongoose.connect(this.MDBURI);
            if (name) { 
                console.log("ingreso a name");
                            
                const response:[] = await userModel.find({name:name});    
                if (response.length > 0) {
                    return response;
                }
                console.log("response", response);
                 
                return response;
            }else{               
                const response = await userModel.find();            
                const data:[] = response.map((doc:any)=>{
                    return {
                        id: doc._id,
                        name: doc.name,
                        password: doc.password,
                    };
                });           
                return data;
            }
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }                    
    }

    async addUser(data:any):Promise<[]>{   
        try {            
            console.log("entro a addUser");     
            const res:[] = await this.getUser(data.name);                    
            if (res.length > 0) {
                throw {status: 400, menssage: "El usuario ya existe"};
            }else{   
                await mongoose.connect(this.MDBURI);
                console.log("data", data);       
                await userModel.insertMany([{
                    name: data.name,
                    password: data.password,
                }]); 
                const newUser:[] = await this.getUser(data.name);
                return newUser;  
            }
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }    
    }

    async getUserById(id:any):Promise<[]>{
        try {
            console.log("entro a getUserById");
            await mongoose.connect(this.MDBURI);
            const response:[] = await userModel.findById(id);
            console.log("response", response);            
            return response;
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }
    }
}

const Users = new User();

module.exports = {Users};