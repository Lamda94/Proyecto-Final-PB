const express = require("express");
const { authHandler } = require("../middleware/authen.js");

const chat = express.Router();

const path = __dirname.replace("Routes", "public");

chat.get("/login", (req,res)=>{
    console.log(req.session.user);
    if (req.session.user) {
        res.sendFile(path+"\\chat.html");
    }else{
        res.sendFile(path+"\\loginChat.html");
    }
    
});

chat.post("/login", (req,res)=>{
    const username = req.body.name;
    if (username) {
        req.session.user = username;
    } 
    res.redirect("http://localhost:8080/chat/login");    
});

chat.get("/logout", (req,res)=>{     
    res.sendFile(path+"\\logoutChat.html");
    req.session.destroy();    
});
module.exports = chat;