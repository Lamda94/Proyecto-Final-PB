const mongoose = require("mongoose");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
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
  
passport.serializeUser((user:any, done:any) =>{ 
    console.log("serializeUser");    
    done(null, user);
});
  
passport.deserializeUser(async (user:any, done:any) => {
    console.log("deserializeUser");
    done(null, await findUser(user.name));
});

export {passport}; 

export const checkAuthentication = (request:any, response:any, next:any) => {
    if (request.isAuthenticated()) {
      return next();
    }
  
    return response
      .redirect(302, '/');
};

  