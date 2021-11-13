import { IProduct, IProductsClass } from '../Interfaces/productClass.Interface';
require("dotenv").config();
let persis:any = process.env.PERSISTENCIA;
persis = parseInt(persis);
const {options} = (persis == 1) ? require("../../Config/MariaDB.js") : require("../../Config/SQLite3.js");
const knex = require("knex")(options);

class Product implements IProductsClass{
    constructor(){
        knex.schema.hasTable("products")
        .then((d:any)=>{
            if (!d) {
                knex.schema
                .createTable("products", (table:any) => {
                    table.increments("id", { primaryKey: true }).notNullable();
                    table.string("name").notNullable();
                    table.string("description").notNullable();
                    table.timestamp("timestamp").defaultTo(knex.fn.now());
                    table.integer("code").notNullable();
                    table.string("picture").notNullable();
                    table.float("price").notNullable();
                    table.integer("stock").notNullable();
                })
                .then(() => console.log("table created"))
                .catch((error:any) => {
                    console.log(error);
                    return {manssage:"Error al crear la base de datos.", err:error}
                })
                .finally(() => {
                    knex.destroy();
                });
            }
        })
        .catch((err:any)=>console.log(err))
    }

    async getProduct(id=false): Promise<IProduct[]>{
        try {
            if (id) {
                const data = []
                const response = await knex.from("products").select("*").where("id", "=", id);
                for (const row of response) {
                    data.push({
                        id: row["id"],
                        name: row["name"],
                        description: row["description"],
                        code: row["code"],
                        picture: row["picture"],
                        price: row["price"],
                        stock: row["stock"],
                    });
               }
               return data;
            }
            const data = [];
            const response = await knex.from("products").select("*");
            for (const row of response) {
                data.push({
                    id: row["id"],
                    name: row["name"],
                    description: row["description"],
                    code: row["code"],
                    picture: row["picture"],
                    price: row["price"],
                    stock: row["stock"],
                });
            }
            return data;
        } catch (error) {
            throw {status: 500, menssage: "Error de base de datos", error};
        }    
    }

    async saveProduct(d:any): Promise<IProduct[]>{
        try {           
            const data = [{       
                name:d.name,
                description:d.description,
                code: Number(d.code),
                picture:d.picture,
                price: Number(d.price),
                stock: Number(d.stock),
            }];
            await knex("products").insert(data);  
            const response:IProduct[] = await this.getProduct();   
            return [response[response.length-1]];       
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }    
    }

    async deleteProduct(id:any): Promise<IProduct[]>{
        try {
            const response = await this.getProduct(id);
            if (response.length == 0) {
                return [];
            }
            await knex.from("products")
            .where("id", "=", id)
            .del()
            return response;
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }    
    }

    async updateProduct(data:any, id:any): Promise<IProduct[]>{        
        try {
            const ProductUpdate = await this.getProduct(id);
            if (ProductUpdate.length == 0) {
                return [];
            }
            await knex("products")
            .where('id', '=', id)
            .update(data);
            const response = await this.getProduct(id);
            return response;
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
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