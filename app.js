const express = require('express');
const app = express();
const server = require('http').createServer(app);
const products = require("./Routes/products.routes.js");
const handlebars = require("express-handlebars");
const {product} = require("./Class/products.class.js");
const ioServer = require("socket.io")(server);


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
server.listen(PORT,()=>console.log(`App start on http://localhost:8080`));
server.on("error", err=>console.log(`Error on server: ${err}`));


ioServer.on("connection", (socket) => {
    let products = product.getProducts();
    console.log("Un cliente se ha conectado");
    socket.emit("productList", products);
  
    socket.on("new-product", (data) => {
      const response = product.saveProduct(data);
      products = product.getProducts();
      ioServer.sockets.emit("productList", products);
    });
  });