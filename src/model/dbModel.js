import {pool} from "../config/db.js"



export async function getUserForLogin(username) {
  const query = `
    SELECT id, username, password, role 
    FROM users 
    WHERE username = ?
  `;
  const [rows] = await pool.query(query, [username]);
  
  return rows[0] ?? null;
}


export async function createTodo(id, title, description, is_done)
{
     const query = `
    INSERT INTO todos (id, title, is_done, description) VALUES
(?, ?, ?, ? );
  `;
  const [rows] = await pool.query(query, [username]);
  
  return rows[0] ?? null;


}









