import express from 'express';
import products from './Routes/products.routes.js';
import path from 'path'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set("view engine", "ejs");

app.use("/api", products);

const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`App is running on port ${PORT}`));
server.on("error", err=>console.log(`Error on server: ${err}`));