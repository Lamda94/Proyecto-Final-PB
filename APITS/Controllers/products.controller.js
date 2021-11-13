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
var ajv_1 = __importDefault(require("ajv"));
require("dotenv").config();
var persis = process.env.PERSISTENCIA;
persis = parseInt(persis);
var productClass = require("../Class/products.js");
var product = productClass.init(persis).product;
var ajv = new ajv_1.default();
var schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        code: { type: "integer" },
        picture: { type: "string" },
        price: { type: "integer" },
        stock: { type: "integer" },
    },
    required: [],
    additionalProperties: false,
};
exports.productList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) return [3 /*break*/, 2];
                return [4 /*yield*/, product.getProduct(id)];
            case 1:
                data = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, product.getProduct()];
            case 3:
                data = _a.sent();
                _a.label = 4;
            case 4:
                if (data.length == 0) {
                    res.status(404).json({ "menssage": "Product not found." });
                }
                else {
                    res.status(200).json(data);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.productAdd = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, data, validate, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema.required = ["name", "description", "code", "picture", "price", "stock"];
                validator = ajv.compile(schema);
                data = {
                    name: req.body.name,
                    description: req.body.description,
                    code: Number(req.body.code),
                    picture: req.body.picture,
                    price: Number(req.body.price),
                    stock: Number(req.body.stock),
                };
                validate = validator(data);
                if (!validate) return [3 /*break*/, 2];
                return [4 /*yield*/, product.saveProduct(data)];
            case 1:
                response = _a.sent();
                if (response.length == 0) {
                    res.status(400).json({ error: "Producto no encontrado" });
                }
                else {
                    res.status(200).json(response);
                }
                return [3 /*break*/, 3];
            case 2:
                res.status(400).json({ error: "Datos incompletos o no validos." });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.productUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, data, id, validate, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                schema.required = ["id", "name", "description", "code", "picture", "price", "stock"];
                validator = ajv.compile(schema);
                data = {
                    name: req.body.name,
                    description: req.body.description,
                    code: Number(req.body.code),
                    picture: req.body.picture,
                    price: Number(req.body.price),
                    stock: Number(req.body.stock),
                };
                id = req.params.id;
                validate = validator(__assign({ id: req.params.id }, data));
                if (!validate) return [3 /*break*/, 2];
                return [4 /*yield*/, product.updateProduct(data, id)];
            case 1:
                response = _a.sent();
                if (response.length == 0) {
                    res.status(400).json({ error: "Producto no encontrado" });
                }
                else {
                    res.status(200).json(response);
                }
                return [3 /*break*/, 3];
            case 2:
                res.status(400).json({ error: "Datos incompletos o no validos." });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(error_1.status).json(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.productDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, product.deleteProduct(id)];
            case 1:
                response = _a.sent();
                if (response.length == 0) {
                    res.status(400).json({ error: "Producto no encontrado" });
                }
                else {
                    res.status(200).json(response);
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(error_2.status).json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.productFilter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filter = __assign({}, req.body);
                return [4 /*yield*/, product.filter(filter)];
            case 1:
                response = _a.sent();
                if (response.length == 0) {
                    res.status(400).json({ error: "Producto no encontrado" });
                }
                else {
                    res.status(200).json(response);
                }
                return [2 /*return*/];
        }
    });
}); };
