"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var menssageSchema = new Schema({
    author: {
        id: Number,
        name: String,
        lastname: String,
        age: Number,
        nickname: String,
        avatar: String,
    },
    text: {
        type: String,
        required: true,
    },
});
var menssageModel = mongoose_1.default.model("menssage", menssageSchema);
module.exports = { menssageModel: menssageModel };
