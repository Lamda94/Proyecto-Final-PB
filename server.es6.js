const handlebars = require("express-handlebars");
const products = require("./Routes/products.routes.js");
const carts = require('./Routes/cart.routes.js');
const chat = require("./Routes/chat.routes.js")
const {notFound} = require("./middleware/routeNotFound.js");

const { app, server} = require("./Server/Server");

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

app.use("/products", products);
app.use("/carts", carts);
app.use("/chat", chat);
/*app.get("/", (req, res)=>{
   const url = __dirname+"\\public\\ListProducts.html";
    res.sendFile(url);
})*/

app.use(notFound);

const PORT = 8080;
server.listen(PORT, ()=>console.log(`App start on http://localhost:8080`));
server.on("error", err=>console.log(`Error on server: ${err}`));



