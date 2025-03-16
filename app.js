const express = require("express");
const app = express();
const dbRouters = require("./router/dbRouters.js");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

app.set("view engine", "ejs");
app.use(session({ secret: process.env.secret, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({extended:true}));
app.use("/",dbRouters);
app.use(express.static('css'));
const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Start of members only app! - listening on port ${PORT}!`);
});