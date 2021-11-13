"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productController = require("../controllers/products.controller");
//const { listTest } = require("../test/productList");
var products = express_1.default.Router();
products.get("/list/:id?", productController.productList);
products.post("/add", productController.productAdd);
products.post("/filter", productController.productFilter);
products.put("/update/:id", productController.productUpdate);
products.delete("/delete/:id", productController.productDelete);
//products.get("/vista-test", listTest);
module.exports = products;
