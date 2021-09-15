const handlebars = require("express-handlebars");
const products = require("./Routes/products.routes.js");
const carts = require('./Routes/cart.routes.js');
const cors = require('cors');
const {notFound} = require("./middleware/routeNotFound.js");


const { ioServer, app, server} = require("./Server/Server");

const ENGINE_NAME:String = "hbs";

app.use(cors())

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

app.use("/products", products);
app.use("/carts", carts);
app.use(notFound);

const PORT:number = 8080;
server.listen(PORT, ()=>console.log(`App start on http://localhost:8080`));
server.on("error", (err:object)=>console.log(`Error on server: ${err}`));