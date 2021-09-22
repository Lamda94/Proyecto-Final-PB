"use strict";

var handlebars = require("express-handlebars");

var products = require("./Routes/products.routes.js");

var carts = require('./Routes/cart.routes.js');

var _require = require("./middleware/routeNotFound.js"),
    notFound = _require.notFound;

var _require2 = require("./Server/Server"),
    ioServer = _require2.ioServer,
    app = _require2.app,
    server = _require2.server;

var ENGINE_NAME = "hbs";
app.engine(ENGINE_NAME, handlebars({
  extname: ".hbs",
  layoutsDir: "./views/layout",
  partialsDir: "./views/partials",
  defaultLayout: "index.hbs"
}));
app.set("view engine", ENGINE_NAME);
app.set("views", "./views");
app.use("/products", products);
app.use("/carts", carts);
app.get("/", function (req, res) {
  var url = __dirname + "\\public\\ListProducts.html";
  res.sendFile(url);
});
app.use(notFound);
var PORT = 8080;
server.listen(PORT, function () {
  return console.log("App start on http://localhost:8080");
});
server.on("error", function (err) {
  return console.log("Error on server: ".concat(err));
});
