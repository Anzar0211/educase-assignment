require("dotenv").config(); 
const fs = require("fs");

const dbConfig = {
  host: process.env.MYSQL_HOST_NAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  ssl: {
    ca: Buffer.from(process.env.SSL_CERT, "base64").toString("utf-8"), // Use escaped backslashes
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

module.exports = dbConfig;
