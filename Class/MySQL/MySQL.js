const {options} = require("../../config/MariaDB.js");
const knex = require("knex")(options);

class Product {
    constructor(){
        knex.schema.hasTable("products")
        .then(d=>{
            if (!d) {
                knex.schema
                .createTable("products", (table) => {
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
                .catch((error) => {
                    console.log(error);
                    return {manssage:"Error al crear la base de datos.", err:error}
                })
                .finally(() => {
                    knex.destroy();
                });
            }
        })
        .catch(err=>console.log(err))
    }

    async getProduct(id=false){
        try {
            this.products=[];
            if (id) {
                let data;
                const response = await knex.from("products").select("*").where("id", "=", id);
                for (const row of response) {
                    data = {
                        id: row["id"],
                        timestamp: row["timestamp"],
                        name: row["name"],
                        description: row["description"],
                        code: row["code"],
                        picture: row["picture"],
                        price: row["price"],
                        stock: row["stock"],
                    };
               }
               return data;
            }
           const response = await knex.from("products").select("*");
           for (const row of response) {
                this.products.push({
                    id: row["id"],
                    timestamp: row["timestamp"],
                    name: row["name"],
                    description: row["description"],
                    code: row["code"],
                    picture: row["picture"],
                    price: row["price"],
                    stock: row["stock"],
                });
           }
           return this.products;
        } catch (error) {
            return []
        }    
    }

    async saveProduct(data){
        try {
            await knex("products").insert(data);            
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }    
        return data;
    }

    async deleteProduct(id){
        try {
            const response = await this.getProduct();
            const productDelete = response.find(d=>d.id==id);
            if (productDelete == undefined) {
                return [];
            }
            await knex.from("products")
            .where("id", "=", id)
            .del()
            return productDelete;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }    
    }

    async updateProduct(data, id){        
        try {
            const productUpdate = await this.getProduct(id);
            if (productUpdate == undefined) {
                return [];
            }
            await knex("products")
            .where('id', '=', id)
            .update(data)  
            return await this.getProduct(id);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }            
    }
}

const product = new Product();

module.exports = {product};