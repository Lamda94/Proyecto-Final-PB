import express from "express";
//const { io } = require("../Class/Chat/server");
const chat = express.Router();

chat.get("/", async(req:any,res:any)=>{
    /*io.on("connection", async (socket:any) => {
        socket.on("chat", async (d:any)=>{  
            let menssage = d.data;*/
            res.json({m:"Hola mundo"});
        /*});
    });  */
});

//products.get("/vista-test", listTest);


module.exports = chat;