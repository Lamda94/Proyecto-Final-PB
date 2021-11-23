"use strict";
var cart = require('./Routes/cart.routes');
var session = require('express-session');
var handlebars = require("express-handlebars");
var products = require("./Routes/products.routes.js");
var acces = require('./Routes/acces.routes.js');
var expressSession = require('express-session');
var connectMongo = require('connect-mongo');
var cors = require('cors');
var notFound = require("./Middlewares/routeNotFound").notFound;
var _a = require("./Server/IOServer"), ioServer = _a.ioServer, app = _a.app, server = _a.server;
require('dotenv').config();
var muri = process.env.MONGO_URI;
app.use(expressSession({
    store: connectMongo.create({
        mongoUrl: muri,
    }),
    secret: 'BTC100K',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000,
    },
}));
app.use(cors());
app.set("views", __dirname + "/Views");
app.set("view engine", "pug");
app.use("/cart", cart);
app.use("/products", products);
app.use("/", acces);
app.use(notFound);
var PORT = 8080;
server.listen(PORT, function () { return console.log("App start on http://localhost:8080"); });
server.on("error", function (err) { return console.log("Error on server: " + err); });
module.exports = { server: server };
