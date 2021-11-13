import express from "express";
const productController = require("../controllers/products.controller");
//const { listTest } = require("../test/productList");
const products = express.Router();

products.get("/list/:id?", productController.productList);

products.post("/add", productController.productAdd);

products.post("/filter", productController.productFilter);

products.put("/update/:id", productController.productUpdate)

products.delete("/delete/:id", productController.productDelete);

//products.get("/vista-test", listTest);


module.exports = products;