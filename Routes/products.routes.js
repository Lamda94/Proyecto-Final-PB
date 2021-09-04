const express = require("express");
const {product} = require("../Class/products.class.js");
const products = express.Router();

const url = __dirname.replace("\\Routes","");


products.get("/products",(req,res)=>{ 
    res.sendFile(url+"/public/index.html");
});

products.get("/products/list/:id", (req,res)=>{
    const id = req.params.id;
    const response = product.getProduct(id);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});

products.post("/products/save",(req,res)=>{ 
    const data = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    const response = product.saveProduct(data);
    //res.status(200).json(response);
    res.redirect('/api/products');
});

products.delete("/product/delete/:id", (req, res)=>{
    const id = req.params.id;
    const response = product.deleteProduct(id);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
});

products.put("/product/update/:id", (req,res)=>{
    const d= {
        data: {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        },
        id: req.params.id
    }
    const response = product.updateProduct(d);
    res.status(200).json(response);
});

module.exports = products;