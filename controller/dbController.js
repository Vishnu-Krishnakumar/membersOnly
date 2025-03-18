const {Router} = require("express");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt  = require("bcryptjs");

async function signUp (req,res) {

    res.render("sign-up",{
        errors:[]
    });
}

async function register (req,res){
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).render("sign-up",{
       errors:errors.array(),
    });
  }
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user ={
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashedPassword: hashedPassword,
    };
    db.createUser(user);
  
    res.render("log-in",{
      errors:[]
    });
  }catch(error){
    console.error(error);
    next(error);
  }
}

async function logIn(req,res){
  console.log(req.user);
  const check = await db.memberCheck(req.user.id);
  if(check){
  const messages = await db.getAllMessagesMember();  
  res.render("index",{
      user: req.user,
      messages: messages,
    });
  }
  else{
      const messages = await db.getAllMessages();  
      res.render("index",{
        user: req.user,
        messages: messages,
      });
  }
}

async function join(req,res){
  console.log(req.body);
  if(req.body.secret === process.env.clubPassword){
    await db.becomeMember(req.user.id);
    logIn(req,res);
  } 
  logIn(req,res);
}
module.exports = {
    signUp,
    register,
    logIn,
    join,
}