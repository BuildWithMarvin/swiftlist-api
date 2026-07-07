import { pool } from "../config/db.js";

export async function getUserForLogin(username) {
  const query = `
    SELECT id, username, password, role 
    FROM users 
    WHERE username = ?
  `;
  const [rows] = await pool.query(query, [username]);

  return rows[0] ?? null;
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
  } catch (err) {
    console.log(err);
    return null;
  }
  return entry.id;
}

export async function getTodos(user_id) {
  const query = `
    Select * from todos WHERE user_id = UNHEX(REPLACE(?,'-',''))
`;

  try {
    const [result] = await pool.query(query, [user_id]);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getTodo(user_id, title)
{
    const query = `
    Select * from todos WHERE user_id = UNHEX(REPLACE(?,'-','')) and title = ? 
`;
try {
    const [result] = await pool.query(query, [user_id, title]);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
