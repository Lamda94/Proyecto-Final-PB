const express = require("express");
const {cart} = require("../Class/cart.class.js");
const {product} = require("../Class/products.class.js");
const carts = express.Router();


carts.get("/list/:id?", async (req,res)=>{ 
    let data;
    const id = req.params.id;
    if (typeof id === 'undefined') {      
        data = await cart.getCart();
    }else{
        data = await cart.getCart(id);
    }
    res.status(200).json(data);   
});

carts.get("/add/:id", async (req,res)=>{
    const id = req.params.id;
    const p = await product.getProduct(id);
    console.log(p);
    const response = await cart.addCart(p);
    console.log(response);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});



carts.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    const response = await cart.deleteCart(id);
    res.status(200).json(response);
});


module.exports = carts;