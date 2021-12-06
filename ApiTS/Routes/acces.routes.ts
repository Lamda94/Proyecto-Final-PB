module.exports = (app:any, passport:any) => {
    const checkAuthentication = (request:any, response:any, next:any) => {
        if (request.isAuthenticated()) {
        return next();
        }
    
        return response
        .redirect(302, '/login');
    };

    app.get('/', checkAuthentication, (req:any, res:any) => {
        if(req.session.name){
            const data = {
                login: true,
                saludo: "Bienvenido "+req.session.name,
                logout: false
            }
            return res.render("index.pug", data);
        }else{
            req.session.name = req.user.name;
            req.session.method = "facebook";  

            const data = {
                login: true,
                saludo: "Bienvenido "+req.session.name,
                logout: false
            }
            return res.render("index.pug", data);
        }
    })

    app.get("/login", (req:any, res:any) => {
        const data = {
            login: false,
            saludo: "",
            logout: false
        }
        return res.render("index.pug", data);   
    });

    app.post("/login", passport.authenticate("Login",{failureRedirect: '/fail'}), async(req:any, res:any) => {
        req.session.name = req.body.name;
        req.session.password = req.body.password;  
        return res.redirect("/");
    });

    app.get("/logout", (req:any, res:any) => {
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

    app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'reauthenticate' }));

    app.get('/auth/facebook/callback',
        passport.authenticate(
            'facebook',
            {
            successRedirect: '/',
            failureRedirect: '/faillogin',
            },
        ),
    );

    app.get("/signup", (req:any, res:any) => res.render("signup.pug"));

    app.post("/signup", passport.authenticate("Signup", { 
        failureRedirect: '/fail', 
        successRedirect: '/login', 
        passReqToCallback: true,
        failureFlash : true 
    }));

    app.get("/fail", (req:any, res:any) => {         
        const msj = req.flash("signupMessage");
        console.log(msj[0]);
        res.render("fail.pug",{menssage: msj[0]})
    });
}