const pool = require('../db')
const express = require('express');

/**
 * https://expressjs.com/en/guide/routing.html#express-router
 * 
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Are you there god');
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
        const router = express.Router();

        router.post('/', async (req, res, next) => {
            try {
                const body = req.body;
                console.log(body);
                const result = await req.models.user.createNewUser(body.email, body.password);
                res.status(201).json(result);
            } catch (err) {
                console.error('Failed to create new user:', err);
                res.status(500).json({ message: err.toString() });
            }

            next();
        })

        router.get('/validate_user', async (req, res, next) => {
          connection.query('SELECT COUNT(*) FROM nft_marketplace.user WHERE username = ' + req.body.username + ' AND password = ' + req.body.password + ';');
          if (err) {
              connection.release();
              logger.error("Problem validating user: ", err);
              res.status(400).send('Problem validating user');
          } else {
              res.status(200).json({
                "data":rows
              })
          }

          next();
      })

        module.exports = router;


        // if there is no issue obtaining a connection, execute query
      //   connection.query('drop table if exists test_table', function (err, rows, fields) {
      //     if (err) { 
      //       // if there is an error with the query, release the connection instance and log the error
      //       connection.release()
      //       logger.error("Problem dropping the table test_table: ", err); 
      //       res.status(400).send('Problem dropping the table'); 
      //     } else {
      //       // if there is no error with the query, execute the next query and do not release the connection yet
      //       connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
      //         if (err) { 
      //           // if there is an error with the query, release the connection instance and log the error
      //           connection.release()
      //           logger.error("Problem creating the table test_table: ", err);
      //           res.status(400).send('Problem creating the table'); 
      //         } else { 
      //           // if there is no error with the query, release the connection instance
      //           connection.release()
      //           res.status(200).send('created the table'); 
      //         }
      //       });
      //     }
      //   });
      // } else {

      }
    });
  });

  // // POST /multplynumber
  // app.post('/multplynumber', (req, res) => {
  //   console.log(req.body.product);
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           // if there is an error with the query, log the error
  //           logger.error("Problem inserting into test table: \n", err);
  //           res.status(400).send('Problem inserting into table'); 
  //         } else {
  //           res.status(200).send(`added ${req.body.product} to the table!`);
  //         }
  //       });
  //     }
  //   });
  // });

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


