import mongoose from 'mongoose'
import productModel from '../../Models/products.model';
import {IProduct, IProductsClass} from '../Interfaces/productClass.Interface';
require('dotenv').config();
let persis:any = process.env.PERSISTENCIA;
persis = parseInt(persis);


class Product implements IProductsClass{
    private MDBURI: any = (persis == 3) ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI;
    constructor(){
    }

    async getProduct(id: any = false): Promise<IProduct[]>{
        try {
            await mongoose.connect(this.MDBURI);
            if (!id) {
                const d: any = await productModel.find();
                if (d) {
                     const data:[IProduct] = d.map((product:any)=>{
                        return {
                            id: product._id,        
                            name:product.name,
                            description:product.description,
                            code: Number(product.code),
                            picture:product.picture,
                            price: Number(product.price),
                            stock: Number(product.stock),
                        }
                    });

                    return data;
                }              
                
                return []
            }else{
                
                if (!isNaN(id)) {
                    id = parseInt(id);    
                }else if (typeof id == "string") {                  
                    if (id.length == 24) {
                        const mongoid: any = new mongoose.Types.ObjectId(id);
                        const d: any = await productModel.findById( mongoid);
                        
                        if (d) {
                            const data:[IProduct] = [{
                                id: d._id,        
                                name:d.name,
                                description:d.description,
                                code: Number(d.code),
                                picture:d.picture,
                                price: Number(d.price),
                                stock: Number(d.stock),
                            }];
                            
                            return data;
                        }
                    }else{
                        throw {status: 500, menssage: "Id no valido debe enviar un id de tipo number o un string de 24 caracteres."};
                    }
                }              
                return [];                
           }
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }
    }

    async saveProduct(data:Object): Promise<IProduct[]>{
        try {
            await mongoose.connect(this.MDBURI);
            await productModel.insertMany(data);
            const response: any = await productModel.find().sort({$natural:-1}).limit(1);
            const saved: IProduct = {
                id: response._id,        
                name:response.name,
                description:response.description,
                code: Number(response.code),
                picture:response.picture,
                price: Number(response.price),
                stock: Number(response.stock),
            };
            return [saved];
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }
    }

    async deleteProduct(id:any):Promise<IProduct[]>{
        try {
            const response: IProduct[] = await this.getProduct(id);
            await mongoose.connect(this.MDBURI); 
            if (response.length == 0) {
                return []
            }
            await productModel.deleteOne({_id: id});
            return response;
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }    
    }

    async updateProduct(data:Object, id:any): Promise<IProduct[]>{        
        try {
            const d: IProduct[] = await this.getProduct(id);
            await mongoose.connect(this.MDBURI);
            if (d.length == 0) {
                return []
            }
            await productModel.updateMany({_id:id}, data);
            const response: IProduct[] = await this.getProduct(id);
            return response;
        } catch (err) {
            console.log(err);
            
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }finally{
            await mongoose.disconnect();
        }           
    }

    async filter(filter:any={}): Promise<IProduct[]>{
        const data = await this.getProduct();
        if (data.length == 0) {
            return [];
        }

        if ("name" in filter) {
            const dataFilter = data.filter(d=>d.name === filter.name);  
            return dataFilter;
        }

        if ("code" in filter) {
            const dataFilter = data.filter(d=>d.code == filter.code)
            return dataFilter;
        }

        if ("price" in filter) {
            const dataFilter = data.filter(d=>d.price > parseInt(filter.price.from) && d.price < parseInt(filter.price.to))
            return dataFilter;
        }
        
        if ("stock" in filter) {
            const dataFilter = data.filter(d=>d.stock > parseInt(filter.stock.from) && d.stock < parseInt(filter.stock.to))
            return dataFilter;
        }

        return data;
    }
}

const product = new Product();

module.exports = {product};