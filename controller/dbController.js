const {Router} = require("express");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function signUp (req,res) {
    res.render("sign-up",{
        errors:[]
    });
}

async function register (req,res){
  const errors = validationResult(req);
  console.log(errors);
  if(!errors.isEmpty()){
    return res.status(400).render("sign-up",{
       errors:errors.array(),
    });
  }
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const password = req.body.password;
  const email = req.body.email;
  res.render("log-in",{
    errors:[]
  });
}

async function logIn(req,res){
    res.render("index")
}
module.exports = {
    signUp,
    register,
    logIn,
}