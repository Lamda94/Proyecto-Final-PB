const {options} = require("../options/SQLite3.js");
const knex = require("knex")(options);

class File{ 
    constructor(){  
        knex.schema.hasTable("chat")
        .then(d=>{
            if (!d) {
                knex.schema
                .createTable("chat", (table) => {
                    table.increments("id");
                    table.string("email");
                    table.string("menssage");
                    table.timestamp("date").defaultTo(knex.fn.now());
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

    async getMenssage(){
        try {
            const data = [];
            this.products = await knex.from("chat").select("*");    
            for (const row of this.products) {
                data.push({email:row["email"],date:row["date"],menssage:row["menssage"],id:row["id"]});
            }
            return data; 
        } catch (err) {
            console.log(err);
        }                    
    }

    async addMenssage(data){    
        try {
            const dataMensage = [{
                email:data.email, 
                date:data.date, 
                menssage:data.menssage,
            }];
            const response = await knex("chat").insert(dataMensage);
            for (const row of response) {
                console.log(row);
            }
        } catch (err) {
            console.log(err);
        }    
    }
}

const chatMenssage = new File();

module.exports = {chatMenssage};