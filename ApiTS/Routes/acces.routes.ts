import  express from "express";
import { checkAuthentication, loginStrategyName, signUpStrategyName, passport } from "../Middlewares/Login.middleware";

const router = express.Router();

router.get("/login", checkAuthentication, async(req:any, res:any) => {
    const data = {
        login: true,
        saludo: "Bienvenido "+req.session.name,
        logout: false
    }
    return res.render("index.pug", data);
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
    req.session.destroy();
    return res.render("index.pug", data);
});

router.get("/signup", (req:any, res:any) => res.render("signup.pug"));

router.post("/signup",passport.authenticate(signUpStrategyName, { failureRedirect: '/failsignup', successRedirect: '/login' }));
module.exports = router;