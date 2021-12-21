"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
exports.process = function (req, res) {
    var path = __dirname + '/process.js';
    var child = child_process_1.fork(path);
    var cantidad = req.query.cant || 100000000;
    child.send(cantidad);
    child.on("message", function (randoms) {
        res.status(200).json(randoms);
    });
};
