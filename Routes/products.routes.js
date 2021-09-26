const express = require("express");
const Ajv = require("ajv");
const {product} = require("../Class/products.class.js");
const products = express.Router();

const ajv = new Ajv()   
const schema = {
    type: "object",
    properties: {
        id:{type: "string"},
        name: {type: "string"},
        description: {type: "string"},
        code: {type: "integer"},
        picture: {type: "string"},
        price: {type: "integer"},
        stock: {type: "integer"},
    },
    required: [],
    additionalProperties: false,
}



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
    schema.required = ["name","description","code","picture","price","stock"];
    const validator = ajv.compile(schema);
    
    const data = {
        name: req.body.name,
        description: req.body.description,
        code: Number(req.body.code),
        picture: req.body.picture,
        price:Number(req.body.price),
        stock:Number(req.body.stock),
    }

    const validate = validator(data);

    if (validate) {
        const response = await product.saveProduct(data);
        if (response.length == 0) {        
            res.status(400).json({error:"Producto no encontrado"});
        } else {
            res.status(200).json(response);
        }   
    }else{
        res.status(400).json({error:"Datos incompletos o no validos."});
    }
});

products.put("/update/:id", async (req,res)=>{
    schema.required = ["id","name","description","code","picture","price","stock"];
    const validator = ajv.compile(schema);

    const data = {       
        name: req.body.data.name,
        description: req.body.data.description,
        code: Number(req.body.data.code),
        picture: req.body.data.picture,
        price: Number(req.body.data.price),
        stock: Number(req.body.data.stock),
    }

    const id = req.params.id;

    const validate = validator({
        id: req.params.id,        
        name: req.body.data.name,
        description: req.body.data.description,
        code: Number(req.body.data.code),
        picture: req.body.data.picture,
        price: Number(req.body.data.price),
        stock: Number(req.body.data.stock),
    });

    if (validate) {
        const response = await product.updateProduct(data, id);
        if (response.length == 0) {        
            res.status(400).json({error:"Producto no encontrado"});
        } else {
            res.status(200).json(response);
        } 
    }else{
        res.status(400).json({error:"Datos incompletos o no validos."});
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