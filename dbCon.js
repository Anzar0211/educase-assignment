// dbCon.js
const mysql = require("mysql2");

const dbConfig = require('./config')


const pool = mysql.createPool(dbConfig).promise();


async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}


testConnection();

module.exports = pool;
