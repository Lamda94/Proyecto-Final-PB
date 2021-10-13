const {options} = require("../../config/SQLite3.js");
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
            //console.log("ingreso");
            this.products=[];
            if (id) {
                const data = []
                const response = await knex.from("products").select("*").where("id", "=", id);
                for (const row of response) {
                    data.push({
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
               //console.log(`data: ${data}`);
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
           //console.log(`data: ${this.products}`);
           return this.products;
        } catch (error) {
            return []
        }    
    }

    async saveProduct(da){
        try {
           
            const data = [{...da}];
            await knex("products").insert(data);            
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }    
        return da;
    }

    async deleteProduct(id){
        //console.log(id);
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
            const productDelete = await this.getProduct(id);
            if (productDelete == undefined) {
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

    async filter(filter={}){
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