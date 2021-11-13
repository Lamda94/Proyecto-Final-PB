"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var persis = process.env.PERSISTENCIA;
persis = parseInt(persis);
var options = ((persis == 1) ? require("../../Config/MariaDB.js") : require("../../Config/SQLite3.js")).options;
var knex = require("knex")(options);
var Product = /** @class */ (function () {
    function Product() {
        knex.schema.hasTable("products")
            .then(function (d) {
            if (!d) {
                knex.schema
                    .createTable("products", function (table) {
                    table.increments("id", { primaryKey: true }).notNullable();
                    table.string("name").notNullable();
                    table.string("description").notNullable();
                    table.timestamp("timestamp").defaultTo(knex.fn.now());
                    table.integer("code").notNullable();
                    table.string("picture").notNullable();
                    table.float("price").notNullable();
                    table.integer("stock").notNullable();
                })
                    .then(function () { return console.log("table created"); })
                    .catch(function (error) {
                    console.log(error);
                    return { manssage: "Error al crear la base de datos.", err: error };
                })
                    .finally(function () {
                    knex.destroy();
                });
            }
        })
            .catch(function (err) { return console.log(err); });
    }
    Product.prototype.getProduct = function (id) {
        if (id === void 0) { id = false; }
        return __awaiter(this, void 0, void 0, function () {
            var data_1, response_3, _i, response_1, row, data, response, _a, response_2, row, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!id) return [3 /*break*/, 2];
                        data_1 = [];
                        return [4 /*yield*/, knex.from("products").select("*").where("id", "=", id)];
                    case 1:
                        response_3 = _b.sent();
                        for (_i = 0, response_1 = response_3; _i < response_1.length; _i++) {
                            row = response_1[_i];
                            data_1.push({
                                id: row["id"],
                                name: row["name"],
                                description: row["description"],
                                code: row["code"],
                                picture: row["picture"],
                                price: row["price"],
                                stock: row["stock"],
                            });
                        }
                        return [2 /*return*/, data_1];
                    case 2:
                        data = [];
                        return [4 /*yield*/, knex.from("products").select("*")];
                    case 3:
                        response = _b.sent();
                        for (_a = 0, response_2 = response; _a < response_2.length; _a++) {
                            row = response_2[_a];
                            data.push({
                                id: row["id"],
                                name: row["name"],
                                description: row["description"],
                                code: row["code"],
                                picture: row["picture"],
                                price: row["price"],
                                stock: row["stock"],
                            });
                        }
                        return [2 /*return*/, data];
                    case 4:
                        error_1 = _b.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: error_1 };
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.saveProduct = function (d) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        data = [{
                                name: d.name,
                                description: d.description,
                                code: Number(d.code),
                                picture: d.picture,
                                price: Number(d.price),
                                stock: Number(d.stock),
                            }];
                        return [4 /*yield*/, knex("products").insert(data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProduct()];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, [response[response.length - 1]]];
                    case 3:
                        err_1 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: err_1 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getProduct(id)];
                    case 1:
                        response = _a.sent();
                        if (response.length == 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, knex.from("products")
                                .where("id", "=", id)
                                .del()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        err_2 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: err_2 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.updateProduct = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductUpdate, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getProduct(id)];
                    case 1:
                        ProductUpdate = _a.sent();
                        if (ProductUpdate.length == 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, knex("products")
                                .where('id', '=', id)
                                .update(data)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getProduct(id)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 4:
                        err_3 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: err_3 };
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.filter = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var data, dataFilter, dataFilter, dataFilter, dataFilter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProduct()];
                    case 1:
                        data = _a.sent();
                        if (data.length == 0) {
                            return [2 /*return*/, []];
                        }
                        if ("name" in filter) {
                            dataFilter = data.filter(function (d) { return d.name === filter.name; });
                            return [2 /*return*/, dataFilter];
                        }
                        if ("code" in filter) {
                            dataFilter = data.filter(function (d) { return d.code == filter.code; });
                            return [2 /*return*/, dataFilter];
                        }
                        if ("price" in filter) {
                            dataFilter = data.filter(function (d) { return d.price > parseInt(filter.price.from) && d.price < parseInt(filter.price.to); });
                            return [2 /*return*/, dataFilter];
                        }
                        if ("stock" in filter) {
                            dataFilter = data.filter(function (d) { return d.stock > parseInt(filter.stock.from) && d.stock < parseInt(filter.stock.to); });
                            return [2 /*return*/, dataFilter];
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return Product;
}());
var product = new Product();
module.exports = { product: product };
