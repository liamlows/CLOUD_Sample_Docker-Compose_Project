const pool = require('./db')

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

   // 
   app.post('/api/users', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;
    var username = req.param('username');
    var password = req.param('password');
    var private = req.body.private;
    let joinDate = new Date();

    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO users(firstName, lastName, phoneNumber, email, username, password, private, joinDate) VALUES(?,?,?,?,?,?,?,?) ', [firstName, lastName, phoneNumber, email, username, password, private, joinDate], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`Added ${req.body.firstName} ${req.body.lastName} to the table!`);
          }
        });
      }
    });
  });

  //api/favorites/{bookID}/?user={userID}
  app.post('/api/favorites/:bookID', (req, res) => {
    var bookID = req.params.bookID;
    var userID = req.param('user');

    console.log(req.body);

    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO favorites(userID, ISBN) VALUES(?,?) ', [userID, bookID], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`Added ISBN: ${bookID} to User: ${userID}'s favorites!`);
          }
        });
      }
    });
  });

  //api/wishlist/{ISBN}?user={userID}
  app.post('/api/wishlist/:ISBN', (req, res) => {
    var ISBN = req.params.ISBN;
    var userID = req.param('user');
    let dateRequested = new Date();

    console.log(req.body);

    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO wishlist(userID, ISBN, dateRequested) VALUES(?,?,?) ', [userID, ISBN, dateRequested], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`Added ISBN: ${bookID} to User: ${userID}'s wishlist at ${dateRequested}!`);
          }
        });
      }
    });
  });

  //api/ratings/{bookID}?user={userID}&rating={rating}
  app.post('/api/ratings/:bookID', (req, res) => {
    var bookID = req.params.bookID;
    var userID = req.param('user');
    var rating = req.param('rating');

    console.log(req.body);

    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO ratings(bookID, rating, userID) VALUES(?,?,?) ', [bookID, rating, userID], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`Added ISBN: ${bookID} to User: ${userID}'s rating with Rating:${rating}!`);
          }
        });
      }
    });
  });

  //api/books/{bookID}?ISBN={ISBN}&author={author}&publisher={publisher}&publicationDate={publicationDate}&condition={condition}&donorID={donorID)&borrowerID={borrowerID}
  app.put('/api/books/:bookID', (req, res) => {
    var bookID = req.params.bookID;
    var ISBN = req.param('ISBN');
    var author = req.param('author');
    var publisher = req.param('publisher');
    var publicationDate = req.param('publicationDate');
    var condition = req.param('condition');
    var donorID = req.param('donorID');
    var borrowerID = req.param('borrowerID');

    console.log(req.body);

    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`
        UPDATE books SET 
        donorID = ${donorID},
        ISBN = ${ISBN},
        Author = "${author}",
        Publisher = "${publisher}",
        publicationDate = "${publicationDate}",
        bookCondition = ${condition},
        borrowerID = ${borrowerID}
        WHERE bookID = ${bookID};
        `, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`Updated BookID: ${bookID} to Books with ISBN:${ISBN}, Author:${author}, Publisher:${publisher}, Publication Date:${publicationDate}, Condition:${condition}, DonorID:${donorID}, and BorrowerID:${borrowerID}!`);
          }
        });
      }
    });
  });


   //api/users/{userID}?username={userName}&password={password}&firstName={firstName}&lastName={lastName}&phoneNumber={phoneNumber}&email={email}&private={private}
   app.put('/api/users/:userID', (req, res) => {
    var userID = req.params.userID;
    var username = req.param('username');
    var password = req.param('password');
    var firstName = req.param('firstName');
    var lastName = req.param('lastName');
    var phoneNumber = req.param('phoneNumber');
    var email = req.param('email');
    var private = req.param('private');

    console.log(req.body);

    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`
        UPDATE users SET 
        private = ${private},
        username = "${username}",
        password = "${password}",
        firstName = "${firstName}",
        lastName = "${lastName}",
        phoneNumber = ${phoneNumber},
        email = "${email}"
        WHERE userID = ${userID};
        `, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`Updated UserID: ${userID} to User with username:${username}, password:${password}, firstName:${firstName}, lastName:${lastName}, phoneNumber:${phoneNumber}, email:${email}, and private:${private}!`);
          }
        });
      }
    });
  });

  //api/ratings/{bookID}?user={userID}&rating={rating}
  app.put('/api/ratings/:bookID', (req, res) => {
    var bookID = req.params.bookID;
    var user = req.param('user');
    var rating = req.param('rating');

    console.log(req.body);

    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`
        UPDATE ratings SET 
        borrowerID = ${user},
        rating = ${rating}
        WHERE bookID = ${bookID}
        `, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`Updated BookID: ${bookID} to Rating with borrowerID:${user} and rating:${rating}!`);
          }
        });
      }
    });
  });
};