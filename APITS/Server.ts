const cart = require('./Routes/cart.routes');
const session = require('express-session');
const handlebars = require("express-handlebars");
const passport = require('passport');
require('./Middlewares/Login.middleware').passport;
const products = require("./Routes/products.routes.js");
const acces = require('./Routes/acces.routes.js');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const cors = require('cors');
const {notFound} = require("./Middlewares/routeNotFound");
const { ioServer, app, server} = require("./Server/IOServer");


require('dotenv').config();
const muri:any = process.env.MONGO_URI;


app.use(
  expressSession({
    store: connectMongo.create({
      mongoUrl: muri,
    }),
    secret: 'BTC100K',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
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