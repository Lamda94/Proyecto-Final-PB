import { IProduct } from '../Class/Interfaces/productClass.Interface';
import Ajv from 'ajv';
import { json } from 'express';
require("dotenv").config();
let persis:any = process.env.PERSISTENCIA;
persis = parseInt(persis);
const productClass = require("../Class/products.js");
const {product} = productClass.init(persis);


const ajv = new Ajv()   
const schema:any = {
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




exports.productList = async (req:any,res:any)=>{ 
    let data:IProduct[];
    const id:any = req.params.id;
    
    if (id) {    
        data = await product.getProduct(id);
    }else{
        data = await product.getProduct();
    }
    if (data.length == 0) {
        res.status(404).json({"menssage":"Product not found."});
    }else{
        res.status(200).json(data);  
    }
}


exports.productAdd = async (req:any,res:any)=>{     
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
        const response: IProduct[] = await product.saveProduct(data);
        if (response.length == 0) {        
            res.status(400).json({error:"Producto no encontrado"});
        } else {
            res.status(200).json(response);
        }   
    }else{
        res.status(400).json({error:"Datos incompletos o no validos."});
    }
}


exports.productUpdate = async (req:any,res:any)=>{
    try {
        schema.required = ["id","name","description","code","picture","price","stock"];
        const validator = ajv.compile(schema);

        const data = {       
            name: req.body.name,
            description: req.body.description,
            code: Number(req.body.code),
            picture: req.body.picture,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
        }        

        const id = req.params.id;

        const validate = validator({
            id: req.params.id,        
            ...data
        });

       if (validate) {
            const response: IProduct[] = await product.updateProduct(data, id);
            if (response.length == 0) {        
                res.status(400).json({error:"Producto no encontrado"});
            } else {
                res.status(200).json(response);
            } 
        }else{
            res.status(400).json({error:"Datos incompletos o no validos."});
        } 
    } catch (error:any) {
        res.status(error.status).json(error);
    }
    
}


exports.productDelete =  async (req:any, res:any)=>{
    try {
        const id = req.params.id;
        const response: IProduct[] = await product.deleteProduct(id);
        if (response.length == 0) {        
            res.status(400).json({error:"Producto no encontrado"});
        } else {
            res.status(200).json(response);
        }   
    } catch (error:any) {
        res.status(error.status).json(error);
    }
    
}

exports.productFilter = async (req:any, res:any)=>{
    const filter = {...req.body};
    const response = await product.filter(filter);
    if (response.length == 0) {        
        res.status(400).json({error:"Producto no encontrado"});
    } else {
        res.status(200).json(response);
    }   
}