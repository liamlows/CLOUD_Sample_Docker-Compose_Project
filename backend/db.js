const mysql = require("mysql");

// mysql connection
var pool = mysql.createPool({
  user: process.env.MYSQL_CLOUD_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_CLOUD_PASS,
  host: process.env.MYSQL_CLOUD_HOST,
  database: process.env.MYSQL_DB,
});

module.exports = pool;
