require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  member BOOLEAN DEFAULT FALSE,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255),
  dateposted TIMESTAMPTZ,
  message VARCHAR(255),
  user_id INTEGER,
  CONSTRAINT foreign_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`


async function main() {
    console.log("seeding...");
    const client = new Client({
      host: process.env.host, // or wherever the db is hosted
      user: process.env.role_name,
      database: process.env.database,
      password: process.env.role_password,
      port: 5432 // The default port
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
  
  main();