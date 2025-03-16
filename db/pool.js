require("dotenv").config();
const { Pool } = require("pg");
module.exports = new Pool({
    host: "localhost", // or wherever the db is hosted
    user: process.env.role_name,
    database: "membersonly",
    password: process.env.role_password,
    port: 5432 // The default port
  });