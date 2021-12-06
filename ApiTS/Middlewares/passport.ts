const { Users } =require('../Class/users.class');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const passportFacebook = require("passport-facebook").Strategy;

module.exports = (passport:any) => {
    const createHash = (password:any) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const isValidPassword = (user:any, password:any) => bcrypt.compareSync(password, user.password);
    
    // Signup
    passport.use("Signup", new localStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
          },
          async (req:any, username:any, password:any, done:any) => {   
              try {
                const user = await Users.getUser(username);
                if(user.length > 0) {
                  console.log("User already exists");                  
                  return done(null, false, req.flash('signupMessage', 'User already exists'));
                }   
                const newUser = await Users.addUser({name:username, password:createHash(password)});
                const data = newUser[0];
                return done(null, data);
              }catch (error:any) {
                return done(error, false, req.flash('signupMessage', error));
              }
          }
    ));
     
    // Login
    passport.use("Login",new localStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
          },
          async (req:any, username:any, password:any, done:any) => {
            try {
              const name = username;
              const data = await Users.getUser(name);              
              if (data.length > 0) {
                const user = data[0];
                if (!isValidPassword(user, password)) {
                  return done(null, false, req.flash('signupMessage', 'Incorrect password.'));
                } 
                return done(null, user);
              } else {
                return done(null, false, req.flash('signupMessage', 'Incorrect username.'));
              }              
            } catch (error) {
              return done(error); 
            }        
          }
    ));
 
    //Login facebook
    passport.use(new passportFacebook({
        clientID: process.argv[3] || process.env.FACEBOOK_APP_ID,
        clientSecret: process.argv[4] || process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'middle_name', 'picture.type(large)'],
    }, async (_accessToken:any, _refreshToken:any, profile:any, done:any)=>{
        try {
          const data = await Users.getUser(profile.displayName);
          if(data.length > 0) {
              const user = data[0];
              if (user.password === profile.id) {                
                  return done(null, user);
              }else{
                  return done(null, false, {message: 'Incorrect password'});
              }      
          }    
          const newUser = await Users.addUser({name: profile.displayName, password: profile.id});
          return done(null, newUser[0]); 
        } catch (error) {
          return done(error);
        }
    }));

    // Serialize
    passport.serializeUser((user:any, done:any) =>done(null, user._id));
    
    // Deserialize
    passport.deserializeUser(async(id:any, done:any) =>{ 
        try {
          console.log("id",id);          
          const result = await Users.getUserById(id);
          return done(null, result);
        } catch (error) {
            return done(error);
        }
    }); 
}
 


  