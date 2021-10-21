require("dotenv").config();
const persis = parseInt(process.env.PERSISTENCIA);
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ioServer = require("socket.io")(server);
const moment = require("moment");
const util = require('util');
const normalizr = require('normalizr');
const { chatMenssage } = require("../Script/chat");
const productClass = require("../Class/products.js");
const {product} = productClass.init(persis);


const url = __dirname.replace("Server", "\public");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(url));

ioServer.on("connection", async (socket) => {
    let products = await product.getProduct();
    const response = await chatMenssage.getMenssage();
    const authorSchema = new normalizr.schema.Entity('author');
    const chatSchema = new normalizr.schema.Entity('chat', {
        author: authorSchema,
    });
    const menssage = normalizr.normalize(response, chatSchema);
    console.log(util.inspect(menssage, false, 12, true));
    socket.emit("productList", products);
    socket.emit("chat", {validate:true, data:menssage});
    socket.on("addMenssage", async (data)=>{  
        console.log(data); 
        await chatMenssage.addMenssage(data);
        let menssage = await chatMenssage.getMenssage();
        socket.emit("chat", {validate:true, data:menssage});
       
        
    })  
});

module.exports = {ioServer, app, server};