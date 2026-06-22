const mysql = require("mysql2/promise");
const config = require("./config")

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: config.db.waitForConnections,
  connectionLimit: config.db.connectionLimit,
  queueLimit: config.db.queueLimt,
});


async function testDatabaseConnection() {
  try {
  
    const connection = await pool.getConnection();
    console.log("Database connection test successful.");
    connection.release(); // Ganz wichtig: Verbindung sofort wieder freigeben!
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Anwendung stoppen, wenn die DB nicht erreichbar ist
  }
}

module.exports = {
  pool,
  testDatabaseConnection
};
