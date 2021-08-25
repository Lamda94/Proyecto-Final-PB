import express from 'express';
import products from './Routes/products.routes.js';
import handlebars from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const ENGINE_NAME = "hbs";

app.engine(
  ENGINE_NAME,
  handlebars({
    extname: ".hbs",
    layoutsDir:"./views/layout",
    partialsDir:"./views/partials",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", ENGINE_NAME);
app.set("views", "./views");


app.use("/api", products);


const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`App is running on port ${PORT}`));
server.on("error", err=>console.log(`Error on server: ${err}`));