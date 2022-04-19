const mysql = require('mysql');

// mysql connection

//ORGINAL
// var pool = mysql.createPool({
//   host: process.env.MYSQL_CLOUD_HOST,
//   user: process.env.MYSQL_CLOUD_USER,
//   password: process.env.MYSQL_CLOUD_PASS,
//   port: process.env.MYSQL_PORT,
//   database: process.env.MYSQL_DB
// });

var pool = mysql.createPool({
  host: 'database-1.c3cfhdojvroz.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'NSCuHCSkZY6JxtzAcv6J',
  port: 3306,
  database: process.env.MYSQL_DB
});

module.exports = pool;
