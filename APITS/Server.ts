
const session = require('express-session');
const handlebars = require("express-handlebars");
const products = require("./Routes/products.routes.js");
const menssage = require('./Routes/chat.routes');
//const carts = require('./Routes/cart.routes.js');
const cors = require('cors');
const {notFound} = require("./Middlewares/routeNotFound");

const { ioServer, app, server} = require("./Server/IOServer");

const sessionHandler = session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
});

const url = __dirname.replace("Server", "\\public");

app.use(sessionHandler);


const ENGINE_NAME:string = "hbs";

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
//app.use("/carts", carts);
app.use("/chat", menssage);
app.use(notFound);

const PORT:number = 8080;
server.listen(PORT, ()=>console.log(`App start on http://localhost:8080`));
server.on("error", (err:object)=>console.log(`Error on server: ${err}`));

module.exports = { server };