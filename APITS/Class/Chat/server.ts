require("dotenv").config();
import util from 'util'
import normalizr from 'normalizr'
const server= require('../../Server');
const productController =require('../Class/products');
const { chatMenssage } = require('./chat.class');

const io = require("socket.io")(server);
const p:any = process.env.PERSISTENCIA;
const persis = parseInt(p);
const product = productController.init(persis);


io.on("connection", async (socket:any) => {
    let products = await product.getProduct();
    const response = await chatMenssage.getMenssage();
    const menssages = {...response};
    const authorSchema = new normalizr.schema.Entity('author');
    const chatSchema = new normalizr.schema.Entity('chat', {
        author: authorSchema,
    });
    const menssage = normalizr.normalize(menssages, chatSchema);
    console.log(menssage);
    
    console.log(util.inspect(menssage, false, 12, true));
    socket.emit("productList", products);
    socket.emit("chat", {validate:true, data:menssage});
    socket.on("addMenssage", async (data:any)=>{  
        await chatMenssage.addMenssage(data);
        let menssage = await chatMenssage.getMenssage();
        socket.emit("chat", {validate:true, data:menssage});
    })  
});

module.exports = {io};