// Update with your config settings.
const mysql = require('mysql');

module.exports = {
  development: {
    client: 'mysql',
    debug: true,
    connection: {
      host : 'gui-database.cztwjmcoyudt.us-east-1.rds.amazonaws.com',
      port : 3306,
      user : 'admin',
      password : 'GUI-db1234',
      insecureAuth: true,
      database : 'nft_marketplace'
    }
  }
};

// module.exports = {
//     development: {
//       client: 'mysql',
//       debug: true,
//       connection: {
//         host : process.env.MYSQL_CLOUD_HOST,
//         port : process.env.MYSQL_PORT,
//         user : process.env.MYSQL_CLOUD_USER,
//         password : process.env.MYSQL_CLOUD_PASS,
//         insecureAuth: true,
//         database : process.env.MYSQL_DB
//       }
//     }
//   };
