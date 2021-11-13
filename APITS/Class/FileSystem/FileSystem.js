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
var fs_1 = require("fs");
var readFile = fs_1.promises.readFile, writeFile = fs_1.promises.writeFile;
var url = __dirname.replace("\\Class\\FileSystem", "\\data\\products.json");
var Product = /** @class */ (function () {
    function Product(name) {
        this.fileName = "";
        this.fileName = name;
    }
    Product.prototype.getProduct = function (id) {
        if (id === void 0) { id = false; }
        return __awaiter(this, void 0, void 0, function () {
            var data, p, products_1, product_1, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, readFile(this.fileName)];
                    case 1:
                        data = _a.sent();
                        p = JSON.parse(data);
                        products_1 = p[0].products;
                        if (products_1.length == 0) {
                            return [2 /*return*/, []];
                        }
                        if (!id) {
                            return [2 /*return*/, products_1];
                        }
                        else {
                            product_1 = products_1.find(function (p) { return p.id == id; });
                            if (product_1) {
                                data_1 = {
                                    id: product_1.id,
                                    name: product_1.name,
                                    description: product_1.description,
                                    code: Number(product_1.code),
                                    picture: product_1.picture,
                                    price: Number(product_1.price),
                                    stock: Number(product_1.stock),
                                };
                                return [2 /*return*/, [data_1]];
                            }
                            return [2 /*return*/, []];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.saveProduct = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var products_2, id, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getProduct()];
                    case 1:
                        products_2 = _a.sent();
                        id = 1;
                        if (products_2.length > 0) {
                            id = Number(products_2[products_2.length - 1].id) + 1;
                        }
                        data.id = id;
                        products_2.push(data);
                        return [4 /*yield*/, this.write(products_2)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: error_2 };
                    case 4: return [2 /*return*/, [data]];
                }
            });
        });
    };
    Product.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products_3, deleted, productsUpdated, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getProduct()];
                    case 1:
                        products_3 = _a.sent();
                        return [4 /*yield*/, this.getProduct(id)];
                    case 2:
                        deleted = _a.sent();
                        if (!(deleted.length == 0)) return [3 /*break*/, 3];
                        return [2 /*return*/, []];
                    case 3:
                        productsUpdated = products_3.filter(function (p) { return p.id != id; });
                        products_3 = productsUpdated;
                        return [4 /*yield*/, this.write(products_3)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, deleted];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: error_3 };
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.updateProduct = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var products_4, updated, d, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getProduct()];
                    case 1:
                        products_4 = _a.sent();
                        data.id = id;
                        return [4 /*yield*/, this.getProduct(id)];
                    case 2:
                        updated = _a.sent();
                        if (updated.length == 0) {
                            return [2 /*return*/, []];
                        }
                        d = products_4
                            .map(function (product) {
                            if (product.id == id) {
                                return data;
                            }
                            else {
                                return product;
                            }
                        });
                        products_4 = d;
                        return [4 /*yield*/, this.write(products_4)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, [data]];
                    case 4:
                        error_4 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: error_4 };
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
    Product.prototype.write = function (d) {
        return __awaiter(this, void 0, void 0, function () {
            var data, p, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, readFile(this.fileName)];
                    case 1:
                        data = _a.sent();
                        p = JSON.parse(data);
                        p[0].products = d;
                        return [4 /*yield*/, writeFile(this.fileName, JSON.stringify(p))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw { status: 500, menssage: "Error escribiendo los datos en el json", error: error_5 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Product;
}());
console.log(url);
var product = new Product(url);
module.exports = { product: product };
