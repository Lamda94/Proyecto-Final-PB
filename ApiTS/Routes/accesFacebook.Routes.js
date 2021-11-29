"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Login_middleware_1 = require("../Middlewares/Login.middleware");
var passportFacebook = require("passport-facebook").Strategy;
Login_middleware_1.passport.serializeUser(function (user, done) { return done(null, user); });
Login_middleware_1.passport.deserializeUser(function (user, done) { return done(null, user); });
