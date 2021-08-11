import express from 'express';
import {promises}  from 'fs';
const { readFile, writeFile, unlink } = promises;
const app = express();

const visits = {items:0, item:0}
const getData = async()=>{
    const dataJSON =  await readFile("./data/archivo.txt"); 
    return JSON.parse(dataJSON);
}

app.get("/items", async(req, res)=>{
    try {
        visits.items++;
        const d = await getData();
        const data = {
            items:d,
            amounth:d.length
        }
        res.send(data);
     } catch (err) {
         console.log("error: "+err.message);
     }      
})

app.get("/item-random", async(req, res)=>{
    try {
        visits.item++;
        const d = await getData();
        const n = Math.round(Math.random()*(d.length-1));
        res.send({item:d[n]});
     } catch (err) {
         console.log("error: "+err.message);
     }   
})

app.get("/visits", async(req, res)=>{
    res.send({visits});  
})

const PORT =8080
const server = app.listen(PORT,()=>console.log(`App is running on port ${PORT}`));
server.on("error", err=>console.log(`Error on server: ${err}`));