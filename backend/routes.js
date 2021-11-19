const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });


//get all users
  app.get('/users', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM users', function (err, rows, fields) {
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

  //get all battles
  app.get('/getbattles', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM battles', function (err, rows, fields) {
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

  // post username and password
  app.post('/signup', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`users` (`username`, `password`) VALUES(\'' + req.body.username + '\', \'' + req.body.password + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.username} to the table!`);
          }
        });
      }
    });
  });

    // post a battle
    app.post('/makebattle', (req, res) => {
      //console.log(req.body.username);
      console.log('hello' + req.body);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('INSERT INTO `db`.`battles` (`battleTopic`, `battleDescription`, `user1`, `user2`) VALUES(\'' + req.body.battleTopic + '\', \''  + req.body.battleDescription + '\', \''+ req.body.user1 + '\', \'' + req.body.user2 + '\')', function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into test table: \n", err);
              res.status(400).send('Problem inserting into table'); 
            } else {
              res.status(200).send(`added ${req.body.battleTopic} to the table!`);
            }
          });
        }
      });
    });


   // post a message
   app.post('/postmessage', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`messages` (`battleID`, `message`, `senderName`, `senderID`, `timestamp`) VALUES(\'' + req.body.battleID + '\', \''  + req.body.message + '\', \'' + req.body.senderName + '\', \'' + req.body.senderID + '\', \'' + req.body.timestamp + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.message} to the table!`);
          }
        });
      }
    });
  });

    // get user by id
    app.get('/getuserbyid', (req, res) => {
      //console.log(req.body.username);
      console.log(req.body);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM `db`.`users` WHERE `userID`= ' + req.body.userID, function (err, rows, fields) {
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

    // get user by id
    app.get('/getmessagesbyid', (req, res) => {
      //console.log(req.body.username);
      console.log(req.body);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT message FROM `db`.`messages` WHERE `battleID`= ' + req.body.battleID, function (err, rows, fields) {
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


    // get battle by id
    app.get('/getbattlebyid', (req, res) => {
      //console.log(req.body.username);
      console.log(req.body);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM `db`.`battles` WHERE `battleID`= ' + req.body.battleID, function (err, rows, fields) {
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
}