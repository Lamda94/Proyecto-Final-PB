const {promises} = require('fs');
const {readFile,writeFile} = promises;
const url = __dirname.replace("\\Script","");

class File{ 
    constructor(name){
        this.filaName = name;
    }

    async getMenssage(){
        try {
           const data =  await readFile(this.filaName); 
           return JSON.parse(data);
        } catch (error) {
            return []
        }        
    }

    async addMenssage(data){
        const array = await this.getMenssage();
        const dataMensage = {
            email:data.email, 
            date:data.date, 
            menssage:data.menssage,
            id: array.length+1,
        };
        array.push(dataMensage);
       try {
           await writeFile(this.filaName, JSON.stringify(array));
       } catch (err) {
           console.log(`Error: ${err.message}`);
       }        
    }
}

const chatMenssage = new File(url+"/data/chat.json");

module.exports = {chatMenssage};