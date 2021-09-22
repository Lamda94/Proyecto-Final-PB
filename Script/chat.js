const { options } = require("../Script/db.config");
const knex = require("knex")(options);

class File{ 
    constructor(){  
        console.log("ingreso");
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

    async getMenssage(){
      /*  const data = [];
        knex
        .from("chat")
        .select("*")
        .then((rows) => {
            for (const row of rows) {
                data.push({email:row["email"],date:row["date"],menssage:row["menssage"],id:row["id"]});
            }
            return data;
        })
        .catch((error) => {
            console.log(error.menssage);
            return {manssage:"Error al optener los datos de la base de datos.", err:error}
        })
        .finally(() => {
            knex.destroy();
        });        */
    }

    async addMenssage(data){        
      /*  const dataMensage = [{
            email:data.email, 
            date:data.date, 
            menssage:data.menssage,
        }];
        knex("chat")
        .insert(dataMensage)
        .then(data => {
            return data; 
        })
        .catch((error) => {
            return {menssage:"Error al insertar los datos", err:error}
        })
        .finally(() => {
            knex.destroy();
        });        */
    }
}

const chatMenssage = new File();

module.exports = {chatMenssage};