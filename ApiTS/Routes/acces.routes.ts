import  express from "express";

const router = express.Router();

router.get("/login", async(req:any, res:any) => {
    const data = {
        login: false,
        saludo: "",
        logout: false
    }
    if (req.session.name) {
        data.login = true;
        data.saludo = "Bienvenido "+req.session.name;
        return res.render("index.pug", data);
    }   
    return res.render("index.pug", data);
});

router.post("/login", async(req:any, res:any) => {
    req.session.name = req.body.name;
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
})

module.exports = router;