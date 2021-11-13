require("dotenv").config();
const p: any = process.env.PERSISTENCIA;
const persis = parseInt(p);
import { normalize, schema } from 'normalizr';
import util from 'util'
import express from 'express';
const app = express();
const server = require('http').createServer(app);
const ioServer = require("socket.io")(server);
const { chatMenssage } = require("../Class/Chat/chat.class");
const productClass = require("../Class/products.js");
const {product} = productClass.init(persis);


const url = __dirname.replace("Server", "\public");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(url));

ioServer.on("connection", async (socket:any) => {
    let products = await product.getProduct();
    
    const response = await chatMenssage.getMenssage();
    const data = {...response};
    
    const authorSchema = new schema.Entity('author');
    const chatSchema = new schema.Entity('chat', {
        author: authorSchema,
    });
    const menssage = normalize(data, chatSchema);
    ///console.log(menssage);
    
    console.log(util.inspect(menssage, false, 12, true));
    socket.emit("productList", products);
    socket.emit("chat", {validate:true, data:menssage});
    socket.on("addMenssage", async (data:any)=>{  
        await chatMenssage.addMenssage(data);
        let menssage = await chatMenssage.getMenssage();
        socket.emit("chat", {validate:true, data:menssage});        
    })  
});

module.exports = {ioServer, app, server};