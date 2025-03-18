const {Router} = require("express");

const dbController = require("../controller/dbController");
const validatation = require("../validate/validation")
const auth = require("../authenticate/auth");
const dbRouters = Router();

dbRouters.get("/",dbController.signUp);
dbRouters.get("/log",(req,res)=>{res.render("log-in")});
dbRouters.get("/log-out",(req,res,next)=>{
    req.logout((err)=>{
        return next(err);
    })
    res.redirect("/");
})

dbRouters.post("/logIn",auth.passport.authenticate('local',{failureRedirect:"/log"}),dbController.logIn);
dbRouters.post("/register",validatation.validateUser,dbController.register);
dbRouters.post("/join", dbController.join);
dbRouters.post("/postMessage",dbController.messagePost);
dbRouters.post("/delete",dbController.messageDelete);
module.exports = dbRouters