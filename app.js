const handlebars = require("express-handlebars");
const products = require("./Routes/products.routes.js");

const { ioServer, app, server} = require("./Server/Server");

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
server.listen(PORT, ()=>console.log(`App start on http://localhost:8080`));
server.on("error", err=>console.log(`Error on server: ${err}`));



