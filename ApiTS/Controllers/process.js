"use strict";
//process genete n numbers ramdon
var randoms = {};
process.on("message", function (cantidad) {
    console.log("cantidad: ", cantidad);
    for (var i = 0; i < cantidad; i++) {
        var randomsNumber = Math.floor(Math.random() * (1000 - 1)) + 1;
        if (randoms[randomsNumber]) {
            randoms[randomsNumber]++;
        }
        else {
            randoms[randomsNumber] = 1;
        }
    }
    process.send(randoms);
});
