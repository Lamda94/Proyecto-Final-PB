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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var products_model_1 = __importDefault(require("../../Models/products.model"));
require('dotenv').config();
var persis = process.env.PERSISTENCIA;
persis = parseInt(persis);
var Product = /** @class */ (function () {
    function Product() {
        this.MDBURI = (persis == 3) ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI;
    }
    Product.prototype.getProduct = function (id) {
        if (id === void 0) { id = false; }
        return __awaiter(this, void 0, void 0, function () {
            var d, data, mongoid, d, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, 10, 12]);
                        return [4 /*yield*/, mongoose_1.default.connect(this.MDBURI)];
                    case 1:
                        _a.sent();
                        if (!!id) return [3 /*break*/, 3];
                        return [4 /*yield*/, products_model_1.default.find()];
                    case 2:
                        d = _a.sent();
                        if (d) {
                            data = d.map(function (product) {
                                return {
                                    id: product._id,
                                    name: product.name,
                                    description: product.description,
                                    code: Number(product.code),
                                    picture: product.picture,
                                    price: Number(product.price),
                                    stock: Number(product.stock),
                                };
                            });
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/, []];
                    case 3:
                        if (!!isNaN(id)) return [3 /*break*/, 4];
                        id = parseInt(id);
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(typeof id == "string")) return [3 /*break*/, 7];
                        if (!(id.length == 24)) return [3 /*break*/, 6];
                        mongoid = new mongoose_1.default.Types.ObjectId(id);
                        return [4 /*yield*/, products_model_1.default.findById(mongoid)];
                    case 5:
                        d = _a.sent();
                        if (d) {
                            data = [{
                                    id: d._id,
                                    name: d.name,
                                    description: d.description,
                                    code: Number(d.code),
                                    picture: d.picture,
                                    price: Number(d.price),
                                    stock: Number(d.stock),
                                }];
                            return [2 /*return*/, data];
                        }
                        return [3 /*break*/, 7];
                    case 6: throw { status: 500, menssage: "Id no valido debe enviar un id de tipo number o un string de 24 caracteres." };
                    case 7: return [2 /*return*/, []];
                    case 8: return [3 /*break*/, 12];
                    case 9:
                        err_1 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: err_1 };
                    case 10: return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 11:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.saveProduct = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, saved, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 7]);
                        return [4 /*yield*/, mongoose_1.default.connect(this.MDBURI)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, products_model_1.default.insertMany(data)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, products_model_1.default.find().sort({ $natural: -1 }).limit(1)];
                    case 3:
                        response = _a.sent();
                        saved = {
                            id: response._id,
                            name: response.name,
                            description: response.description,
                            code: Number(response.code),
                            picture: response.picture,
                            price: Number(response.price),
                            stock: Number(response.stock),
                        };
                        return [2 /*return*/, [saved]];
                    case 4:
                        err_2 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: err_2 };
                    case 5: return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 7]);
                        return [4 /*yield*/, this.getProduct(id)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, mongoose_1.default.connect(this.MDBURI)];
                    case 2:
                        _a.sent();
                        if (response.length == 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, products_model_1.default.deleteOne({ _id: id })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response];
                    case 4:
                        err_3 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: err_3 };
                    case 5: return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.updateProduct = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var d, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 8]);
                        return [4 /*yield*/, this.getProduct(id)];
                    case 1:
                        d = _a.sent();
                        return [4 /*yield*/, mongoose_1.default.connect(this.MDBURI)];
                    case 2:
                        _a.sent();
                        if (d.length == 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, products_model_1.default.updateMany({ _id: id }, data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getProduct(id)];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 5:
                        err_4 = _a.sent();
                        console.log(err_4);
                        throw { status: 500, menssage: "Error de base de datos", error: err_4 };
                    case 6: return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 7:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
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
