const express = require("express");
const {product} = require("../Class/products.class.js");
const products = express.Router();


products.get("/list/:id?",async (req,res)=>{ 
    let data;
    const id = req.params.id;
    if (typeof id === 'undefined') {    
        data = await product.getProduct();
    }else{
        data = await product.getProduct(id);
    }

    res.status(200).json(data);  
});

products.post("/add", async (req,res)=>{
    const data = {
        name: req.body.name,
        description: req.body.description,
        code: Number(req.body.code),
        picture: req.body.picture,
        price:Number(req.body.price),
        stock:Number(req.body.stock),
    }
    const response = await product.saveProduct(data);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});

products.put("/update/:id", async (req,res)=>{
    const data = {
        id: Number(req.params.id),        
        name: req.body.name,
        description: req.body.description,
        code: Number(req.body.code),
        picture: req.body.picture,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
    }
    const response = await product.updateProduct(data);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
})

products.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    const response = await product.deleteProduct(id);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});


module.exports = products;