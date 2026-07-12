import { pool } from "../config/db.js";
import {handleDbError} from "../middleware/dbErrorMap.js"

export async function getUserForLogin(username) {
  const query = `
    SELECT id, username, password, role 
    FROM users 
    WHERE username = ?
  `;
  try{
    const [rows] = await pool.query(query, [username]);

  return rows[0] ?? null;
}
  catch (err) {
    
    throw handleDbError(err);
  }
}

export async function createTodo(entry) {
  const query = `
    INSERT INTO todos (id, user_id, title, is_done, description) VALUES
(UNHEX(REPLACE(?,'-','')),UNHEX(REPLACE(?,'-','')), ?, ?, ? );
  `;
  try {
    const [result] = await pool.query(query, [
      entry.id,
      entry.user_id,
      entry.title,
      entry.is_done,
      entry.description,
    ]);
  }  catch (err) {
    throw handleDbError(err);
  }
  
}

export async function getTodos(user_id) {
  const query = `
    Select * from todos WHERE user_id = UNHEX(REPLACE(?,'-',''))
`;
try {
    const [result] = await pool.query(query, [user_id]);
    return result;
  } catch (err) {
    throw handleDbError(err);
  }
}

export async function getTodo(id) {
  const query = `
    Select * from todos WHERE id = UNHEX(REPLACE(?,'-','')) 
`;
  try {
    const [result] = await pool.query(query, [id]);
    return result;
  } catch (err) {
    throw handleDbError(err);
  }
}

export async function createUser(user) {
  const query = `
    INSERT INTO users (id, username, password, email, role) VALUES
(UNHEX(REPLACE(?,'-','')),?, ?, ?,?);
  `;
  try {
    const [result] = await pool.query(query, [
      user.id,
      user.username,
      user.password,
      user.email,
      user.role,
    ]);
    return result;
  } catch (err) {
    throw handleDbError(err);
  }
  
}

