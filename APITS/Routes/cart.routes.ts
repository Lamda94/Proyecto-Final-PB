const {getcart, addcart, removecart} = require('../Controllers/cart.controller');
const express = require("express");
const carts = express.Router();

carts.get("/list/:id?", getcart);

carts.get("/add/:id", addcart);

carts.delete("/delete/:id", removecart);

module.exports = carts;