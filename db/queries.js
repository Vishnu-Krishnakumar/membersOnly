const pool = require("./pool");


async function createUser(user){
  const {rows} = await pool.query("INSERT INTO USERS(firstname,lastname,email,member,password,admin) values ($1,$2,$3,$4,$5,$6)",[user.firstname,user.lastname,user.email,false,user.hashedPassword,user.admin])
}

async function getAllMessagesMember(){
  const {rows} = await pool.query("SELECT users.firstname, messages.title, messages.dateposted, messages.message,messages.id FROM messages INNER JOIN users on messages.user_id = users.id");
  return rows;
}

async function getAllMessages(){
  const {rows} = await pool.query("SELECT messages.title, messages.message,messages.id FROM messages INNER JOIN users on messages.user_id = users.id");
  return rows;
}

async function becomeMember(id){
  await pool.query ("UPDATE users SET member = true WHERE id = $1",[`${id}`]);
}

async function memberCheck(id){
  let {rows} = await pool.query("SELECT member from users where id = $1",[`${id}`]);

  return rows[0].member;
}
async function adminCheck(id){
  let {rows} = await pool.query("SELECT admin from users where id = $1",[`${id}`]);

  return rows[0].admin;
}

async function addMessage(user){
  const iso8601timestamp = new Date().toISOString()
  await pool.query("INSERT INTO messages (title,dateposted,message,user_id) values ($1,$2,$3,$4)",[user.messageTitle,iso8601timestamp,user.userMessage,user.id]);
}
async function deleteMessage(id){
  await pool.query ("DELETE FROM messages where id = $1",[`${id}`])
}

module.exports = {
    createUser,
    getAllMessagesMember,
    getAllMessages,
    becomeMember,
    memberCheck,
    adminCheck,
    addMessage,
    deleteMessage,
}