const express = require("express");
const {cart} = require("../Class/cart.class.js");
const {product} = require("../Class/products.class.js");
const carts = express.Router();


carts.get("/list/:id?",(req,res)=>{ 
    let data;
    const id = req.params.id;
    if (typeof id === 'undefined') {      
        data = cart.getCart();
    }else{
        data = cart.getCart(id);
    }
    if (data.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(data);
    } 
});

carts.get("/add/:id", (req,res)=>{
    const id = req.params.id;
    const p = product.getProduct(id);
    const response = cart.addCart(p);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});



carts.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    const response = product.deleteProduct(id);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});


module.exports = carts;