const express = require("express");
const {product} = require("../Class/products.class.js");
const products = express.Router();


products.get("/list/:id?",(req,res)=>{ 
    let data;
    const id = req.params.id;
    if (typeof id === 'number') {        
        data = product.getProduct(id);
    }else{
        data = product.getProduct();
    }

    if (data.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(data);
    }   
});

products.post("/add", (req,res)=>{
    const data = {
        timestamp: Date.now(),
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        picture: req.body.picture,
        price:req.body.price,
        stock:req.body.stock,
    }
    const response = product.saveProduct(data);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});

products.put("/update/:id", (req,res)=>{
    const data = {
        id: req.params.id,
        timestamp: Date.now(),
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        picture: req.body.picture,
        price:req.body.price,
        stock:req.body.stock,
    }
    const response = product.updateProduct(data);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
})

products.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    const response = product.deleteProduct(id);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});


module.exports = products;