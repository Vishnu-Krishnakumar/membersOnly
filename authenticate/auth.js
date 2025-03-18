const pool = require("../db/pool");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt  = require("bcryptjs");
require("dotenv").config();
// passport.session({ secret: process.env.secret, resave: false, saveUninitialized: false ,session:true})

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        
        const {rows} = await pool.query("SELECT * FROM users WHERE email = $1", [username]);
        const user = rows[0];
        
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

module.exports ={
    passport,
}