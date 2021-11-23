const cart = require('./Routes/cart.routes');
const session = require('express-session');
const handlebars = require("express-handlebars");
const products = require("./Routes/products.routes.js");
const acces = require('./Routes/acces.routes.js');
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



app.use(sessionHandler);

app.use(cors());

app.set("views", __dirname + "/Views");
app.set("view engine", "pug");

app.use("/cart", cart);
app.use("/products", products);
app.use("/", acces);
app.use(notFound);

const PORT:number = 8080;
server.listen(PORT, ()=>console.log(`App start on http://localhost:8080`));
server.on("error", (err:object)=>console.log(`Error on server: ${err}`));

module.exports = { server };