import mysql from 'mysql2/promise';
import config from '../../config.json' with { type: 'json' };

export const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: config.db.waitForConnections,
  connectionLimit: config.db.connectionLimit,
  queueLimit: config.db.queueLimt,
});


export async function testDatabaseConnection() {
  try {
  
    const connection = await pool.getConnection();
    console.log("Database connection test successful.");
    connection.release(); 
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); 
  }
}

