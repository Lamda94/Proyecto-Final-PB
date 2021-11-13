module.exports = { init: (n)=>{
    switch (n) {
        case 0:
            return { product } = require("./FileSystem/FSystem.js");
            break;
        
        case 1:
            return { product } = require("./MySQL/MySQL.js");
            break;

        case 2:
            return { product } = require("./SQLite/SQLite.js");
            break;

        case 3:
            return { product } = require("./MondoDB/local.js");
            break;
        
        case 4:
            return { product } = require("./MondoDB/BDaaS.js");
            break;

        case 5:
            return { product } = require("./MondoDB/BDaaS.js");
            break;

        case 6:
            return { product } = require("./FireBase/firebase.js");
            break;
    
        default:
            break;
    }
}}