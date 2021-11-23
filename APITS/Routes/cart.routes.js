"use strict";
var _a = require('../Controllers/cart.controller'), getcart = _a.getcart, addcart = _a.addcart, removecart = _a.removecart;
var express = require("express");
var carts = express.Router();
carts.get("/list/:id?", getcart);
carts.get("/add/:id", addcart);
carts.delete("/delete/:id", removecart);
module.exports = carts;
