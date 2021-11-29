import  express from "express";
import { checkAuthentication, loginStrategyName, signUpStrategyName, passport } from "../Middlewares/Login.middleware";

const router = express.Router();

router.get("/login", async(req:any, res:any) => {
    if (req.session.passport) {
        const d:any = JSON.parse(JSON.stringify(req.user._json));
        req.session.name = d.first_name;
        req.session.method = "facebook";  

        const data = {
            login: true,
            saludo: "Bienvenido "+req.session.name,
            logout: false
        }
        return res.render("index.pug", data);
    }else if(req.session.name){
        const data = {
            login: true,
            saludo: "Bienvenido "+req.session.name,
            logout: false
        }
        return res.render("index.pug", data);
    }else{
        const data = {
            login: false,
            saludo: "",
            logout: false
        }
        return res.render("index.pug", data);
    }    
});

router.post("/login", passport.authenticate(loginStrategyName), async(req:any, res:any) => {
    req.session.name = req.body.name;
    req.session.password = req.body.password;  
    return res.redirect("/login");
});

router.get("/logout", async(req:any, res:any) => {
    const data = {
        login: false,
        saludo: "Hasta luego "+req.session.name,
        logout: true
    }
    if (req.session.method === "facebook") {        
        req.logout();
    }
    req.session.destroy();
    
    return res.render("index.pug", data);
});

router.get('/auth/facebook', passport.authenticate('facebook', { authType: 'reauthenticate' }));

router.get('/auth/facebook/callback',
    passport.authenticate(
        'facebook',
        {
        successRedirect: '/login',
        failureRedirect: '/faillogin',
        },
    ),
);

router.get("/signup", (req:any, res:any) => res.render("signup.pug"));

router.post("/signup",passport.authenticate(signUpStrategyName, { failureRedirect: '/failsignup', successRedirect: '/login' }));
module.exports = router;