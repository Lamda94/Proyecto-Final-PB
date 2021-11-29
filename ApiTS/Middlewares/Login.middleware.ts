const mongoose = require("mongoose");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportFacebook = require("passport-facebook").Strategy;
const { userModel } = require("../Models/user.model");

export const loginStrategyName = 'login';
export const signUpStrategyName = 'Signup';

const findUser = async (username:string) => {
    console.log("findUser");
    const user =await userModel.findOne({username:username});
    console.log(user); 
    if(!user){
        return null;
    }       
    return user;
}

passport.use(
    loginStrategyName,
    new Strategy(
        {
            nameField: 'name',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (name:string, password:string, done:any) => {            
            const user = await findUser(name);
            if (!user) {
                console.log('Usuario no registrado');
        
                return done(null, false);
            }
            if (user.password !== password) {
                console.log('Contraseña invalida');
        
                return done(null, false);
            }
            console.log('Login OK');
            return done(null, user);
        },
    ),
);
  
passport.use(
    signUpStrategyName,
    new Strategy(
        {
            nameField: 'name',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (name:string, password:string, done:any) => {
            console.log("ingreso");
            const find = await findUser(name);
            
            if (!find) {
                console.log('Usuario ya existe');
        
                return done(null, false);
            }
    
            const user = {
                name,
                password,
            };
            await userModel.insertMany(user);
            console.log('SignUp OK');
            return done(null, user);
        },
    ),
);
  
passport.use(new passportFacebook({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'middle_name', 'picture.type(large)'],
}, (_accessToken:any, _refreshToken:any, profile:any, done:any) => done(null, profile)));


passport.serializeUser((user:any, done:any) => done(null, user));
  
passport.deserializeUser( (user:any, done:any) => done(null, user));
export {passport}; 

export const checkAuthentication = (request:any, response:any, next:any) => {
    if (request.isAuthenticated()) {
      return next();
    }
  
    return response
      .redirect(302, '/');
};

  