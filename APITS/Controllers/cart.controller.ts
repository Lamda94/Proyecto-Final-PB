import cartClass from '../Class/Cart/cart.class';
import {ICart} from '../Class/Interfaces/cart.interface';
import {IProduct} from '../Class/Interfaces/productClass.Interface';
require("dotenv").config();
const p:any =  process.env.PERSISTENCIA;
const persis = parseInt(p);
const productClass = require("../Class/products.js");
const {product} = productClass.init(persis);
const cart = new cartClass();
exports.getcart = async (req:any,res:any)=>{ 
    const data:ICart[] = await cart.getCart();
    res.status(200).json(data);   
}

exports.addcart = async (req:any,res:any)=>{ 
    let cart = new cartClass();
    const productAdd: IProduct = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        picture: req.body.picture,
        price: req.body.price,
        stock: req.body.stock,
    }
    const response = await product.getProduct(productAdd.id);
    if(response.length > 0){
        const data:ICart[] = await cart.AddToCart(productAdd);
        res.status(200).json(data);   
    }else{
        res.status(400).json({
            message: "Product not found"
        });
    }
}

exports.removecart = async (req:any,res:any)=>{ 
    let cart = new cartClass();
    const id = req.params.id;
    const response = await product.getProduct(id);
    if(response.length > 0){
        const data:ICart[] = await cart.RemoveToCart(id);
        res.status(200).json(data);      
    }else{
        res.status(400).json({
            message: "Product not found"
        });
    }
}

