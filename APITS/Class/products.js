"use strict";
module.exports = { init: function (n) {
        switch (n) {
            case 0:
                return require("./FileSystem/FileSystem");
                break;
            case 1:
                return require("./SQL/SQL");
                break;
            case 2:
                return require("./SQL/SQL");
                break;
            case 3:
                return require("./MongoDB/mongoDB");
                break;
            case 4:
                return require("./MongoDB/mongoDB");
                break;
            case 5:
                return require("./MongoDB/mongoDB");
                break;
            case 6:
                return require("./FireBase/FireBaseDB");
                break;
            default:
                break;
        }
    } };
