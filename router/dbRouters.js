const {Router} = require("express");

const dbController = require("../controller/dbController");
const validateUser = require("../validate/validation")
const dbRouters = Router();

dbRouters.get("/",dbController.signUp);
dbRouters.post("/register",validateUser.validateUser,dbController.register);
dbRouters.get("/log",dbController.register);
dbRouters.get("/loggedIn",dbController.logIn);
module.exports = dbRouters