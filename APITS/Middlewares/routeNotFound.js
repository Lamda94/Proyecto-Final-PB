"use strict";
exports.notFound = function (req, res, next) {
    return res.status(404).send({ error: -2, description: "Route " + req.url + " method " + req.method + " It's not implemented." });
};
