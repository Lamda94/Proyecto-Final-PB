import express from 'express';
import {promises}  from 'fs';
const { readFile, writeFile, unlink } = promises;
const app = express();

const vistas = {items:0, item:0}
const getData = async()=>{
    const dataJSON =  await readFile("./data/archivo.txt"); 
    return JSON.parse(dataJSON);
}

app.get("/items", async(req, res)=>{
    try {
        vistas.items++;
        const d = await getData();
        const data = {
            items:d,
            cantidad:d.length
        }
        res.send(data);
     } catch (err) {
         console.log("error: "+err.message);
     }      
})

app.get("/item-random", async(req, res)=>{
    try {
        vistas.item++;
        const d = await getData();
        const n = Math.round(Math.random()*d.length);
        res.send({item:d[n]});
     } catch (err) {
         console.log("error: "+err.message);
     }   
})

app.get("/visitas", async(req, res)=>{
    res.send({visitas:vistas});  
})

const PORT =8080
const server = app.listen(PORT,()=>console.log(`App coriendo en el puerto ${PORT}`));
server.on("error", err=>console.log(`Error en el servidor: ${err}`));