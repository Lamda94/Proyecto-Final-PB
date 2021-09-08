const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ioServer = require("socket.io")(server);
const moment = require("moment");
const { chatMenssage } = require("../Script/chat");
const {product} = require("../Class/products.class.js");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

ioServer.on("connection", async (socket) => {
    let products = product.getProducts();
    let menssage = await chatMenssage.getMenssage();
    socket.emit("productList", products);
    socket.emit("chat", menssage);
    socket.on("addMenssage", async (data)=>{   
        let now= moment();
        data.date = now.format('DD/MM/YYYY  HH:mm:ss');
        await chatMenssage.addMenssage(data);
        let menssage = await chatMenssage.getMenssage();
        socket.emit("chat", menssage);
    })
});

module.exports = {ioServer, app, server};