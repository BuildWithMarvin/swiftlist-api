const db = require("../config/db");



async function getUserForLogin(username) {
  const query = `
    SELECT user_id, username, password, role 
    FROM users 
    WHERE username = ?
  `;
  const [rows] = await db.pool.query(query, [username]);
  
  return rows[0] ?? null;
}



module.exports = {
  getUserForLogin
};
