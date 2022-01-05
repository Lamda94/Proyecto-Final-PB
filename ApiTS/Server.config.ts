const cart = require('./Routes/cart.routes');
const session = require('express-session');
const handlebars = require("express-handlebars");
const passport = require('passport');
const products = require("./Routes/products.routes.js");
const info = require('./Routes/info.routes.js');
const random = require('./Routes/random.routes.js');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const flash = require('connect-flash');
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
app.use(flash());
app.use(cors());

app.set("views", __dirname + "/Views");
app.set("view engine", "pug");

app.use("/cart", cart);
app.use("/products", products);
app.use("/info", info);
app.use("/random", random);
require('./Middlewares/passport')(passport);
require('./Routes/acces.routes.js')(app, passport)
app.use(notFound);

module.exports = {server};