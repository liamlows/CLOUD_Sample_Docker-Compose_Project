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

//NEW
// var pool = mysql.createPool({
//   host: 'database-1.c3cfhdojvroz.us-east-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'NSCuHCSkZY6JxtzAcv6J',
//   port: 3306,
//   database: 'db'
// });

// module.exports = pool;

//
module.exports = {
  development: {
    client: 'mysql',
    debug: true,
    connection: {
      host : 'database-1.c3cfhdojvroz.us-east-1.rds.amazonaws.com',
      port : 3306,
      user : 'admin',
      password : 'NSCuHCSkZY6JxtzAcv6J',
      insecureAuth: true,
      database : 'db'
    }
  }
};