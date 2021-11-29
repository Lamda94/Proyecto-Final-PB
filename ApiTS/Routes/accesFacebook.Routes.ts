import { passport } from "../Middlewares/Login.middleware";
const passportFacebook = require("passport-facebook").Strategy;



passport.serializeUser((user:any, done:any) => done(null, user));
  
passport.deserializeUser((user:any, done:any) => done(null, user));