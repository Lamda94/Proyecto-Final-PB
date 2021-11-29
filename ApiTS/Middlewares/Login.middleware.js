"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthentication = exports.passport = exports.signUpStrategyName = exports.loginStrategyName = void 0;
var mongoose = require("mongoose");
var passport = require('passport');
exports.passport = passport;
var Strategy = require('passport-local').Strategy;
var passportFacebook = require("passport-facebook").Strategy;
var userModel = require("../Models/user.model").userModel;
exports.loginStrategyName = 'login';
exports.signUpStrategyName = 'Signup';
var findUser = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("findUser");
                return [4 /*yield*/, userModel.findOne({ username: username })];
            case 1:
                user = _a.sent();
                console.log(user);
                if (!user) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, user];
        }
    });
}); };
passport.use(exports.loginStrategyName, new Strategy({
    nameField: 'name',
    passwordField: 'password',
    passReqToCallback: true,
}, function (name, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, findUser(name)];
            case 1:
                user = _a.sent();
                if (!user) {
                    console.log('Usuario no registrado');
                    return [2 /*return*/, done(null, false)];
                }
                if (user.password !== password) {
                    console.log('Contraseña invalida');
                    return [2 /*return*/, done(null, false)];
                }
                console.log('Login OK');
                return [2 /*return*/, done(null, user)];
        }
    });
}); }));
passport.use(exports.signUpStrategyName, new Strategy({
    nameField: 'name',
    passwordField: 'password',
    passReqToCallback: true,
}, function (name, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var find, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("ingreso");
                return [4 /*yield*/, findUser(name)];
            case 1:
                find = _a.sent();
                if (!find) {
                    console.log('Usuario ya existe');
                    return [2 /*return*/, done(null, false)];
                }
                user = {
                    name: name,
                    password: password,
                };
                return [4 /*yield*/, userModel.insertMany(user)];
            case 2:
                _a.sent();
                console.log('SignUp OK');
                return [2 /*return*/, done(null, user)];
        }
    });
}); }));
passport.use(new passportFacebook({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'middle_name', 'picture.type(large)'],
}, function (_accessToken, _refreshToken, profile, done) { return done(null, profile); }));
passport.serializeUser(function (user, done) { return done(null, user); });
passport.deserializeUser(function (user, done) { return done(null, user); });
var checkAuthentication = function (request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    return response
        .redirect(302, '/');
};
exports.checkAuthentication = checkAuthentication;
