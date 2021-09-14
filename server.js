"use strict";
var handlebars = require("express-handlebars");
var products = require("./Routes/products.routes.js");
var carts = require('./Routes/cart.routes.js');
var _a = require("./Server/Server"), ioServer = _a.ioServer, app = _a.app, server = _a.server;
var ENGINE_NAME = "hbs";
app.engine(ENGINE_NAME, handlebars({
    extname: ".hbs",
    layoutsDir: "./views/layout",
    partialsDir: "./views/partials",
    defaultLayout: "index.hbs",
}));
app.set("view engine", ENGINE_NAME);
app.set("views", "./views");
app.use("/products", products);
app.use("/carts", carts);
var PORT = 8080;
server.listen(PORT, function () { return console.log("App start on http://localhost:8080"); });
server.on("error", function (err) { return console.log("Error on server: " + err); });
