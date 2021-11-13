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
require("dotenv").config();
var p = process.env.PERSISTENCIA;
var persis = parseInt(p);
var normalizr_1 = require("normalizr");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var server = require('http').createServer(app);
var ioServer = require("socket.io")(server);
var chatMenssage = require("../Class/Chat/chat.class").chatMenssage;
var productClass = require("../Class/products.js");
var product = productClass.init(persis).product;
var url = __dirname.replace("Server", "\public");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(url));
var chatNormalized = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, authorSchema, chatSchema, chatListSchema, menssage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, chatMenssage.getMenssage()];
            case 1:
                data = _a.sent();
                authorSchema = new normalizr_1.schema.Entity('author', {}, { idAttribute: 'nickname' });
                chatSchema = new normalizr_1.schema.Entity('menssages', {
                    author: authorSchema,
                });
                chatListSchema = new normalizr_1.schema.Array(chatSchema);
                menssage = normalizr_1.normalize(data, chatListSchema);
                return [2 /*return*/, menssage];
        }
    });
}); };
ioServer.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var products, menssage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product.getProduct()];
            case 1:
                products = _a.sent();
                return [4 /*yield*/, chatNormalized()];
            case 2:
                menssage = _a.sent();
                socket.emit("productList", products);
                socket.emit("chat", { validate: true, data: menssage });
                socket.on("addMenssage", function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var menssage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, chatMenssage.addMenssage(data)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, chatNormalized()];
                            case 2:
                                menssage = _a.sent();
                                socket.emit("chat", { validate: true, data: menssage });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
module.exports = { ioServer: ioServer, app: app, server: server };
