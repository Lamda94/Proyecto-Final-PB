"use strict";
var PORT = process.argv[2] || 8080;
var clust = process.argv[3] || "FORK";
if (clust === "FORK") {
    var server_1 = require("./Server.config.js").server;
    server_1.listen(PORT, function () { return console.log("App start on http://localhost:" + PORT); });
    server_1.on("error", function (err) { return console.log("Error on server: " + err); });
}
else if (clust === "CLUSTER") {
    var cluster = require('cluster');
    var cpus_1 = require('os').cpus().length;
    var server_2 = require("./Server.config.js").server;
    if (cluster.isMaster) {
        console.log("Master " + process.pid + " is running");
        for (var i = 0; i < cpus_1; i++) {
            cluster.fork();
        }
        cluster.on("online", function (worker) {
            console.log("Worker " + worker.process.pid + " is online");
        });
    }
    else {
        server_2.listen(PORT, function () { return console.log("App start on http://localhost:" + PORT); });
        server_2.on("error", function (err) { return console.log("Error on server: " + err); });
    }
}
