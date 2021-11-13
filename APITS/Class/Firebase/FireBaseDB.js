"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("./db/ecommerce-ch-30b8e-firebase-adminsdk-flbpr-e10a2c17b5.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-ch-30b8e.firebaseio.com",
});
var firestoreAdmin = firebase_admin_1.default.firestore();
var collection = firestoreAdmin.collection("ecommers");
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.getProduct = function (id) {
        if (id === void 0) { id = false; }
        return __awaiter(this, void 0, void 0, function () {
            var doc, d, data_1, queryGet, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id !== false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, collection.doc(id.toString()).get()];
                    case 1:
                        doc = _a.sent();
                        if (!doc.exists) {
                            return [2 /*return*/, []];
                        }
                        else {
                            d = doc.data();
                            data_1 = __assign({ id: doc.id }, d);
                            return [2 /*return*/, [data_1]];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, collection.get()];
                    case 3:
                        queryGet = _a.sent();
                        data = queryGet.docs.map(function (doc) {
                            var d = doc.data();
                            var response = {
                                id: doc.id,
                                name: d.name,
                                description: d.description,
                                code: d.code,
                                picture: d.picture,
                                price: d.price,
                                stock: d.stock,
                            };
                            return response;
                        });
                        if (data.length == 0) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Product.prototype.saveProduct = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var id, d, i, da, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = 1;
                        return [4 /*yield*/, this.getProduct()];
                    case 1:
                        d = _a.sent();
                        if (d.length > 0) {
                            id = (parseInt(d[d.length - 1].id) + 1);
                        }
                        return [4 /*yield*/, collection.doc(id.toString()).create(data)];
                    case 2:
                        _a.sent();
                        i = id;
                        da = {
                            id: id,
                            name: data.name,
                            description: data.description,
                            code: data.code,
                            picture: data.picture,
                            price: data.price,
                            stock: data.stock,
                        };
                        return [2 /*return*/, [da]];
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
            var response, error_1;
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
                        return [4 /*yield*/, collection.doc(id).delete()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_1 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: error_1 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.updateProduct = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var d, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getProduct(id)];
                    case 1:
                        d = _a.sent();
                        if (d.length == 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, collection.doc(id).update(data)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getProduct(id)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 4:
                        err_2 = _a.sent();
                        throw { status: 500, menssage: "Error de base de datos", error: err_2 };
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
