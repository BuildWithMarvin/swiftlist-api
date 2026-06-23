import {pool} from "../config/db.js"



export async function getUserForLogin(username) {
  const query = `
    SELECT user_id, username, password, role 
    FROM users 
    WHERE username = ?
  `;
  const [rows] = await pool.query(query, [username]);
  
  return rows[0] ?? null;
}




