const express = require("express");
const productController = require("../controllers/products.controller.js");
const products = express.Router();

products.get("/list/:id?", productController.productList);

products.post("/add", productController.productAdd);

products.put("/update/:id", productController.productUpdate)

products.delete("/delete/:id", productController.productDelete);


module.exports = products;