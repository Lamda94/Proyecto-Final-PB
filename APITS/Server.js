"use strict";
var session = require('express-session');
var handlebars = require("express-handlebars");
var products = require("./Routes/products.routes.js");
var menssage = require('./Routes/chat.routes');
//const carts = require('./Routes/cart.routes.js');
var cors = require('cors');
var notFound = require("./Middlewares/routeNotFound").notFound;
var _a = require("./Server/IOServer"), ioServer = _a.ioServer, app = _a.app, server = _a.server;
var sessionHandler = session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    },
});
var url = __dirname.replace("Server", "\\public");
app.use(sessionHandler);
var ENGINE_NAME = "hbs";
app.use(cors());
app.engine(ENGINE_NAME, handlebars({
    extname: ".hbs",
    layoutsDir: "./views/layout",
    partialsDir: "./views/partials",
    defaultLayout: "index.hbs",
}));
app.set("view engine", ENGINE_NAME);
app.set("views", "./views");
app.use("/products", products);
//app.use("/carts", carts);
app.use("/chat", menssage);
app.use(notFound);
var PORT = 8080;
server.listen(PORT, function () { return console.log("App start on http://localhost:8080"); });
server.on("error", function (err) { return console.log("Error on server: " + err); });
module.exports = { server: server };
