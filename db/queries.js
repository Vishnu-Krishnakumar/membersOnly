const pool = require("./pool");


async function createUser(user){
  const {rows} = await pool.query("INSERT INTO USERS(firstname,lastname,email,member,password) values ($1,$2,$3,$4,$5)",[user.firstname,user.lastname,user.email,false,user.hashedPassword])
}


module.exports = {
    createUser,
}