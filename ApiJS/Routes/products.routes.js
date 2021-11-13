const express = require("express");
const productController = require("../controllers/products.controller.js");
const { listTest } = require("../test/productList.js");
const products = express.Router();

products.get("/list/:id?", productController.productList);

products.post("/add", productController.productAdd);

products.post("/filter", productController.productFilter);

products.put("/update/:id", productController.productUpdate)

products.delete("/delete/:id", productController.productDelete);

products.get("/vista-test", listTest);


module.exports = products;