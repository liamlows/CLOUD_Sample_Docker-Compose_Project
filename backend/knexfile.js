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