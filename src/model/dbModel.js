import { pool } from "../config/db.js";
import { handleDbError } from "../middleware/dbErrorMap.js"

export async function getUserForLogin(username) {
  const query = `
    SELECT id, username, password, role 
    FROM users 
    WHERE username = $1
  `;
  try {
    const { rows } = await pool.query(query, [username]);

    return rows[0] ?? null;
  } catch (err) {
    throw handleDbError(err);
  }
}

export async function createTodo(entry) {
  const query = `
    INSERT INTO todos (id, user_id, title, is_done, description) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id; 
  `;
  try {
    const { rows } = await pool.query(query, [
      entry.id,
      entry.user_id,
      entry.title,
      entry.is_done,
      entry.description,
    ]);

    return rows[0];
  } catch (err) {
    throw handleDbError(err);
  }
}

export async function getTodos(user_id) {
  const query = `
    SELECT * FROM todos WHERE user_id = $1
  `;
  try {
    const { rows } = await pool.query(query, [user_id]);
    
    
    return rows; 
  } catch (err) {
    throw handleDbError(err);
  }
}

export async function getTodo(todo) {
  const query = `
    Select * from todos WHERE title = $1 
`;
  try {
    const { rows } = await pool.query(query, [todo]);
    return rows;
  } catch (err) {
    throw handleDbError(err);
  }
}

export async function createUser(user) {
  const query = `
    INSERT INTO users (id, username, password, email, role) VALUES
($1, $2, $3, $4, $5);
  `;
  try {
    const { rows } = await pool.query(query, [
      user.id,
      user.username,
      user.password,
      user.email,
      user.role,
    ]);
    return rows;
  } catch (err) {
    throw handleDbError(err);
  }

}

