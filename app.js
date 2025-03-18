const express = require("express");
const session = require("express-session");
const app = express();
const pool = require("./db/pool");
const pgSession = require('connect-pg-simple')(session);
const dbRouters = require("./router/dbRouters.js");
const { body, validationResult } = require("express-validator");
const auth = require("./authenticate/auth.js");
const LocalStrategy = require('passport-local').Strategy;

app.set("view engine", "ejs");
app.use(session({
  store: new pgSession({
    pool: pool,
    createTableIfMissing: true,
  }),
  secret: process.env.secret, 
  resave: false, saveUninitialized: false ,
  session:true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(auth.passport.session());
app.use(express.urlencoded({extended:true}));
app.use("/",dbRouters);
app.use(express.static('css'));
const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Start of members only app! - listening on port ${PORT}!`);
});