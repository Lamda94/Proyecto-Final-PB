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

const chatNormalized = async():Promise<any>=>{
    const data = await chatMenssage.getMenssage();
    const authorSchema = new schema.Entity('author',{},{idAttribute: 'nickname'});
    const chatSchema = new schema.Entity('menssages', {
        author: authorSchema,
    });
    const chatListSchema = new schema.Array(chatSchema);
    const menssage = normalize(data, chatListSchema);
    return menssage;
};

ioServer.on("connection", async (socket:any) => {
    let products = await product.getProduct();
    const menssage = await chatNormalized();
    socket.emit("productList", products);
    socket.emit("chat", {validate:true, data:menssage});
    socket.on("addMenssage", async (data:any)=>{ 
        await chatMenssage.addMenssage(data);
        const menssage = await chatNormalized();
        socket.emit("chat", {validate:true, data:menssage});        
    })  
});

module.exports = {ioServer, app, server};