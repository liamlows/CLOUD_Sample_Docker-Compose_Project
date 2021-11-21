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
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

  //SYDNEY'S ROUTES

  /*
  * DRIVERS
  */
  
  //GET all users
  // /api/users
  app.get('/users', function (req, res) {
    pool.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET all drivers
  // /api/drivers
  app.get('/drivers', function (req, res) {
    pool.query("SELECT * FROM drivers", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a paritcular driver
  //	/api/driver
  app.get('/driver', function (req, res) {
    var driverID = req.param('driverID');
    pool.query("SELECT * FROM drivers WHERE driverID = ?", driverID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new driver
  // /api/drivers
  app.post('/drivers', async (req, res) => {
    var userID = req.param("userID");
    var foodDonationID = req.param("foodDonationID");
    var licensePlate = req.param("licensePlate");
    var carMake = req.param('carMake');
    var carModel = req.param('carModel');
    var carYear = req.param('carYear');
    var carColor = req.param('carColor');
    
    pool.query("INSERT INTO drivers (userID, foodDonationID, licensePlate, carMake, carModel, carYear, carColor) VALUES (?,?,?,?,?,?,?)", 
    [userID, foodDonationID, licensePlate, carMake, carModel, carYear, carColor],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a foodDonationID (give the driver a new donation to deliver)
  // /api/driver/updateFoodDonationID
  app.put('/driver/updateFoodDonationID', async (req, res) => {
    var driverID = req.param("driverID");
    var foodDonationID = req.param("foodDonationID");

    pool.query("UPDATE drivers SET foodDonationID = ? WHERE driverID = ?", 
    [foodDonationID, driverID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new license plate
  // /api/driver/updateLicensePlate
  app.put('/driver/updateLicensePlate', async (req, res) => {
    var driverID = req.param("driverID");
    var licensePlate = req.param("licensePlate");

    pool.query("UPDATE drivers SET licensePlate = ? WHERE driverID = ?", 
    [licensePlate, driverID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new car make
  // /api/driver/updateCarMake
  app.put('/driver/updateCarMake', async (req, res) => {
    var driverID = req.param("driverID");
    var carMake = req.param("carMake");

    pool.query("UPDATE drivers SET carMake = ? WHERE driverID = ?", 
    [carMake, driverID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new car model
  // /api/driver/updateCarModel
  app.put('/driver/updateCarModel', async (req, res) => {
    var driverID = req.param("driverID");
    var carModel = req.param("carModel");

    pool.query("UPDATE drivers SET carModel = ? WHERE driverID = ?", 
    [carModel, driverID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new car year
  // /api/driver/updateCarYear
  app.put('/driver/updateCarYear', async (req, res) => {
    var driverID = req.param("driverID");
    var carYear = req.param("carYear");

    pool.query("UPDATE drivers SET carYear = ? WHERE driverID = ?", 
    [carYear, driverID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new car color
  // /api/driver/updateCarColor
  app.put('/driver/updateCarColor', async (req, res) => {
    var driverID = req.param("driverID");
    var carColor = req.param("carColor");

    pool.query("UPDATE drivers SET carColor = ? WHERE driverID = ?", 
    [carColor, driverID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //DELETE a particular driver
  //  /api/driver
  app.delete('/driver', async (req, res) => {
  	var driverID = req.param("driverID");
  
    pool.query("DELETE FROM drivers WHERE driverID = ?", driverID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); 
      });
    });

  /*
  * AVAILABILITIES
  */

  //GET all availabilites
  // /api/availabilities
  app.get('/availabilities', function (req, res) {
    pool.query("SELECT * FROM availabilities", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a list of availabilities by driverID
  //	/api/availability
  app.get('/availability', function (req, res) {
    var driverID = req.param('driverID');
    pool.query("SELECT * FROM availabilities WHERE driverID = ?", driverID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new availability for a given driver
  // /api/availabilities
  app.post('/availabilities', async (req, res) => {
    var driverID = req.param("driverID");
    var startAvailability = req.param("startAvailability");
    var endAvailability = req.param("endAvailability");

    pool.query("INSERT INTO availabilities (driverID, startAvailability, endAvailability) VALUES (?,?,?)", 
    [driverID, startAvailability, endAvailability],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new availability start time
  // /api/availability/updateStartTime
  app.put('/availability/updateStartTime', async (req, res) => {
    var availabilityID = req.param("availabilityID");
    var startAvailability = req.param("startAvailability");

    pool.query("UPDATE availabilities SET startAvailability = ? WHERE availabilityID = ?", 
    [startAvailability, availabilityID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new availability end time
  // /api/availability/updateEndTime
  app.put('/availability/updateEndTime', async (req, res) => {
    var availabilityID = req.param("availabilityID");
    var endAvailability = req.param("endAvailability");

    pool.query("UPDATE availabilities SET endAvailability = ? WHERE availabilityID = ?", 
    [endAvailability, availabilityID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
});

  //DELETE a particular availability
  //  /api/availabilities
  app.delete('/availability', async (req, res) => {
    var availabilityID = req.param("availabilityID");

    pool.query("DELETE FROM availabilities WHERE availabilityID = ?", availabilityID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); 
      });
  });

  /*
  * RATINGS
  */

  // /api/ratings
  app.get('/ratings', function (req, res) {
    pool.query("SELECT * FROM ratings", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a list of ratings by driverID
  //	/api/rating
  app.get('/rating', function (req, res) {
    var driverID = req.param('driverID');
    pool.query("SELECT * FROM ratings WHERE driverID = ?", driverID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new rating for a given driver
  // /api/ratings
  app.post('/ratings', async (req, res) => {
    var driverID = req.param("driverID");
    var stars = req.param("stars");
    var rating = req.param("rating");
    var datePosted = req.param("datePosted");

    pool.query("INSERT INTO ratings (driverID, stars, rating, datePosted) VALUES (?,?,?,?)", 
    [driverID, stars, rating, datePosted],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new rating driverID
  // /api/rating/updateDriverID
  app.put('/rating/updateDriverID', async (req, res) => {
    var ratingID = req.param("ratingID");
    var driverID = req.param("driverID");

    pool.query("UPDATE ratings SET driverID = ? WHERE ratingID = ?", 
    [driverID, ratingID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new rating stars value
  // /api/rating/updateStars
  app.put('/rating/updateStars', async (req, res) => {
    var ratingID = req.param("ratingID");
    var stars = req.param("stars");

    pool.query("UPDATE ratings SET stars = ? WHERE ratingID = ?", 
    [stars, ratingID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new rating rating value
  // /api/rating/updateRating
  app.put('/rating/updateRating', async (req, res) => {
    var ratingID = req.param("ratingID");
    var rating = req.param("rating");

    pool.query("UPDATE ratings SET rating = ? WHERE ratingID = ?", 
    [rating, ratingID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new rating datePosted value
  // /api/rating/updateDatePosted
  app.put('/rating/updateDatePosted', async (req, res) => {
    var ratingID = req.param("ratingID");
    var datePosted = req.param("datePosted");

    pool.query("UPDATE ratings SET datePosted = ? WHERE ratingID = ?", 
    [datePosted, ratingID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //DELETE a particular rating
  //  /api/rating
  app.delete('/rating', async (req, res) => {
    var ratingID = req.param("ratingID");
    pool.query("DELETE FROM ratings WHERE ratingID = ?", ratingID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); 
      });
  });

  //BRIGETTA'S ROUTES















  




  //BLAKES'S ROUTES

  /*
  * DELIVERY ROUTES
  */

  //GET a list of all deliveries
  // /api/deliveries
  app.get('/deliveries', function (req, res) {
    pool.query("SELECT * FROM deliveries", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a specific delivery based on deliveryID
  //	/api/delivery
  app.get('/delivery', function (req, res) {
    var deliveryID = req.param('deliveryID');
    pool.query("SELECT * FROM deliveries WHERE deliveryID = ?", deliveryID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new rating for a given driver
  // /api/deliveries
  app.post('/deliveries', async (req, res) => {
    var driverID = req.param("driverID");
    var foodDonationID = req.param("foodDonationID");
    var deliveryStatus = req.param("deliveryStatus");

    pool.query("INSERT INTO deliveries (driverID, foodDonationID, deliveryStatus) VALUES (?,?,?)", 
    [driverID, foodDonationID, deliveryStatus],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new delivery driverID
  // /api/delivery/updateDriverID
  app.put('/delivery/updateDriverID', async (req, res) => {
    var deliveryID = req.param("deliveryID");
    var driverID = req.param("driverID");

    pool.query("UPDATE deliveries SET driverID = ? WHERE deliveryID = ?", 
    [driverID, deliveryID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new delivery foodDonationID
  // /api/delivery/updateFoodDonationID
  app.put('/delivery/updateFoodDonationID', async (req, res) => {
    var deliveryID = req.param("deliveryID");
    var foodDonationID = req.param("foodDonationID");

    pool.query("UPDATE deliveries SET foodDonationID = ? WHERE deliveryID = ?", 
    [foodDonationID, deliveryID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new delivery deliveryStatus
  // /api/delivery/updateDeliveryStatus
  app.put('/delivery/updateDeliveryStatus', async (req, res) => {
    var deliveryID = req.param("deliveryID");
    var deliveryStatus = req.param("deliveryStatus");

    pool.query("UPDATE deliveries SET deliveryStatus = ? WHERE deliveryID = ?", 
    [deliveryStatus, deliveryID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //DELETE a particular delivery
  //  /api/delivery
  app.delete('/delivery', async (req, res) => {
    var deliveryID = req.param("deliveryID");
    pool.query("DELETE FROM deliveries WHERE deliveryID = ?", deliveryID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); 
      });
  });
}
