const pool = require('./db');
const bcrypt = require('bcryptjs');

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  // Users POST /users
  app.post('/users', (req, res) => {
    // obtain a connection with server
    pool.getConnection(function (err, connection) {
      if(err) { // if there is an error obtaining a connection
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      }
      else { // if there is no error obtaining a connection
        const username = req.body.username
        const password = req.body.password
        const is_construction_firm = JSON.parse(req.body.is_construction_firm)
        const saltRounds = 10;
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            const sql = 'INSERT INTO db.users (username, pass, is_construction_firm) VALUES(?, ?, ?)';
            connection.query(sql, [username, hash, is_construction_firm], function(err, rows, fields) {
              connection.release();
              if(err) {
                logger.error("Error adding new user: \n", err);
                res.status(400).send("Username is taken.")
              } else {
                res.status(200).send();
              }
            });
           });
        });
      }
    })
  });

  // Users GET /login
  app.get('/login', (req, res) => {
    pool.getConnection(function (err, connection) {
      if(err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const username = req.body.username
        var sql = "SELECT * FROM db.users WHERE username = ?";
        connection.query(sql, [username], function (err, rows, fields) {
          if (err) {
            logger.error("Error while username salt: \n", err);
            res.status(400).send("Invalid username.")
          } else {
            const hash = rows[0]["pass"]
            const password = req.body.password
            
            bcrypt.compare(password, hash, function(err, result) {
              if(result) {
                sql = "SELECT username, is_construction_firm FROM db.users WHERE username = ?";
                connection.query(sql, [username], function(err, rows, fields) {
                  if(err) {
                    logger.error("Error retrieving information: \n", err);
                    res.status(400).send("Error retrieving login information from database.")
                  } else {
                    res.status(200).end(JSON.stringify(rows));
                  }
                });
              } else {
                logger.error("Error no matching password: \n", err);
                res.status(400).send("Incorrect username or password");
              }
            });
          }
        });
      }
    });
  });
}