"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getInfo = require('../Controllers/info.controller').getInfo;
var router = express_1.Router();
router.get('/', getInfo);
module.exports = router;
