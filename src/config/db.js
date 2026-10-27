import pg from 'pg';
const { Pool } = pg;
import config from '../../config.js'

export const pool = new Pool({
  connectionString: config.db.supabaseConnectionString,
  max: config.db.maxConnections,
  connectionTimeoutMillis: config.db.connectionTimeoutMillis,
  idleTimeoutMillis: config.db.idleTimeoutMillis
});


export async function testDatabaseConnection() {
  try {
    
    const client = await pool.connect(); 
    console.log("Database connection test successful.");
    
    client.release(); 
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); 
  }
}

