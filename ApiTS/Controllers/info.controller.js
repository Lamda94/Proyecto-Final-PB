"use strict";
var cpus = require('os').cpus().length;
var getInfo = function (req, res) {
    var data = {
        argv: process.argv.slice(2) || null,
        platform: process.platform,
        version: process.version,
        memoria: JSON.stringify(process.memoryUsage()),
        path: process.cwd(),
        id: process.pid,
        cpus: cpus,
    };
    res.render('info.pug', data);
};
module.exports = { getInfo: getInfo };
