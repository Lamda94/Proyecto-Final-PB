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
const session  = require("express-session");

const sessionHandler = session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
});

const url = __dirname.replace("Server", "\\public");

app.use(sessionHandler);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(url));

ioServer.on("connection", async (socket) => {
    let i = 0;

    //----------------------------------- GETS ----------------------------------------------
    let products = await product.getProduct();
    const data = await chatMenssage.getMenssage();
  
    //--------------------------------- NORMALIZACION ------------------------------------------
    /*const authorSchema = new normalizr.schema.Entity('authors');
    const chatSchema = new normalizr.schema.Entity('text', {
        author: authorSchema,
    });

    const menssage = normalizr.normalize(data, chatSchema);
    console.log(util.inspect(menssage, false, 12, true));*/
    
    //----------------------------------- EMITS ------------------------------------------------ 
    socket.emit("productList", products);
    socket.emit("chat", {validate:true, data});

    //----------------------------------- ONS --------------------------------------------------- 
    socket.on("addMenssage", async (data)=>{  
        await chatMenssage.addMenssage(data);
        let menssage = await chatMenssage.getMenssage();
        socket.emit("chat", {validate:true, data:menssage});        
    })  
});

module.exports = {ioServer, app, server};