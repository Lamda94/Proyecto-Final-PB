"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var processController = require('../controllers/process.controller');
var processRouter = express_1.Router();
processRouter.get('/', processController.process);
module.exports = processRouter;
