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
  app.get('/api/users', function (req, res) {
    pool.query("SELECT * FROM users", function (err, result, fields) {
      if (err) {
        console.log(err);
        throw err;
      }

      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET all drivers
  // /api/drivers
  app.get('/api/drivers', function (req, res) {
    pool.query("SELECT * FROM drivers", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a paritcular driver
  //	/api/driver
  app.get('/api/driver', function (req, res) {
    var driverID = req.param('driverID');
    pool.query("SELECT * FROM drivers WHERE driverID = ?", driverID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new driver
  // /api/drivers
  app.post('/api/drivers', async (req, res) => {
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

  //PUT all fields for a driver
  // /api/driver
    app.put('/api/driver', async (req, res) => {
      var driverID = req.param("driverID");
      var userID = req.param("userID");
      var foodDonationID = req.param("foodDonationID");
      var licensePlate = req.param("licensePlate");
      var carMake = req.param('carMake');
      var carModel = req.param('carModel');
      var carYear = req.param('carYear');
      var carColor = req.param('carColor');

      pool.query("UPDATE drivers SET userID = ?, foodDonationID = ?, licensePlate = ?, carMake = ?, carModel = ?, carYear = ?, carColor = ? WHERE driverID = ?", 
      [userID, foodDonationID, licensePlate, carMake, carModel, carYear, carColor, driverID],function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format
      });
    });

  //PUT a foodDonationID (give the driver a new donation to deliver)
  // /api/driver/updateFoodDonationID
  app.put('/api/driver/updateFoodDonationID', async (req, res) => {
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
  app.put('/api/driver/updateLicensePlate', async (req, res) => {
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
  app.put('/api/driver/updateCarMake', async (req, res) => {
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
  app.put('/api/driver/updateCarModel', async (req, res) => {
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
  app.put('/api/driver/updateCarYear', async (req, res) => {
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
  app.put('/api/driver/updateCarColor', async (req, res) => {
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
  app.delete('/api/driver', async (req, res) => {
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
  app.get('/api/availabilities', function (req, res) {
    pool.query("SELECT * FROM availabilities", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a list of availabilities by driverID
  //	/api/availability
  app.get('/api/availability', function (req, res) {
    var driverID = req.param('driverID');
    pool.query("SELECT * FROM availabilities WHERE driverID = ?", driverID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new availability for a given driver
  // /api/availabilities
  app.post('/api/availabilities', async (req, res) => {
    var driverID = req.param("driverID");
    var startAvailability = req.param("startAvailability");
    var endAvailability = req.param("endAvailability");

    pool.query("INSERT INTO availabilities (driverID, startAvailability, endAvailability) VALUES (?,?,?)", 
    [driverID, startAvailability, endAvailability],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

      //PUT all fields for an availability
    // /api/availability
    app.put('/api/availability', async (req, res) => {
      var availabilityID = req.param("availabilityID");
      var driverID = req.param("driverID");
      var startAvailability = req.param("startAvailability");
      var endAvailability = req.param("endAvailability");

      pool.query("UPDATE availabilities SET driverID = ?, startAvailability = ?, endAvailability = ? WHERE availabilityID = ?", 
      [driverID, startAvailability, endAvailability, availabilityID],function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format
      });
    });

  //PUT a new availability start time
  // /api/availability/updateStartTime
  app.put('/api/availability/updateStartTime', async (req, res) => {
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
  app.put('/api/availability/updateEndTime', async (req, res) => {
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
  app.delete('/api/availability', async (req, res) => {
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
  app.get('/api/ratings', function (req, res) {
    pool.query("SELECT * FROM ratings", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a list of ratings by driverID
  //	/api/rating
  app.get('/api/rating', function (req, res) {
    var driverID = req.param('driverID');
    pool.query("SELECT * FROM ratings WHERE driverID = ?", driverID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new rating for a given driver
  // /api/ratings
  app.post('/api/ratings', async (req, res) => {
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

    //PUT all fields for a rating
    // /api/rating
    app.put('/api/rating', async (req, res) => {
      var ratingID = req.param("ratingID");
      var driverID = req.param("driverID");
      var stars = req.param("stars");
      var rating = req.param("rating");
      var datePosted = req.param("datePosted");

      pool.query("UPDATE ratings SET driverID = ?, stars = ?, rating = ?, datePosted = ? WHERE ratingID = ?", 
      [driverID, stars, rating, datePosted, ratingID],function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format
      });
    });

  //PUT a new rating driverID
  // /api/rating/updateDriverID
  app.put('/api/rating/updateDriverID', async (req, res) => {
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
  app.put('/api/rating/updateStars', async (req, res) => {
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
  app.put('/api/rating/updateRating', async (req, res) => {
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
  app.put('/api/rating/updateDatePosted', async (req, res) => {
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
  app.delete('/api/rating', async (req, res) => {
    var ratingID = req.param("ratingID");
    pool.query("DELETE FROM ratings WHERE ratingID = ?", ratingID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); 
      });
  });

  /*
  * DELIVERY ROUTES
  */

  //GET a list of all deliveries
  // /api/deliveries
  app.get('/api/deliveries', function (req, res) {
    pool.query("SELECT * FROM deliveries", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a specific delivery based on deliveryID
  //	/api/delivery
  app.get('/api/delivery', function (req, res) {
    var deliveryID = req.param('deliveryID');
    pool.query("SELECT * FROM deliveries WHERE deliveryID = ?", deliveryID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new rating for a given driver
  // /api/deliveries
  app.post('/api/deliveries', async (req, res) => {
    var driverID = req.param("driverID");
    var foodDonationID = req.param("foodDonationID");
    var deliveryStatus = req.param("deliveryStatus");

    pool.query("INSERT INTO deliveries (driverID, foodDonationID, deliveryStatus) VALUES (?,?,?)", 
    [driverID, foodDonationID, deliveryStatus],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT all fields for a delivery
  // /api/delivery
  app.put('/api/delivery', async (req, res) => {
    var deliveryID = req.param("deliveryID");
    var driverID = req.param("driverID");
    var foodDonationID = req.param("foodDonationID");
    var deliveryStatus = req.param("deliveryStatus");

    pool.query("UPDATE deliveries SET driverID = ?, foodDonationID = ?, deliveryStatus = ? WHERE deliveryID = ?", 
    [driverID, foodDonationID, deliveryStatus, deliveryID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new delivery driverID
  // /api/delivery/updateDriverID
  app.put('/api/delivery/updateDriverID', async (req, res) => {
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
  app.put('/api/delivery/updateFoodDonationID', async (req, res) => {
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
  app.put('/api/delivery/updateDeliveryStatus', async (req, res) => {
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
  app.delete('/api/delivery', async (req, res) => {
    var deliveryID = req.param("deliveryID");
    pool.query("DELETE FROM deliveries WHERE deliveryID = ?", deliveryID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); 
      });
  });

  /*
  * SOUP KITCHEN ROUTES
  */

  //GET a list of all Soup Kitchens
  // /api/soupkitchens
  app.get('/api/soupkitchens', function (req, res) {
    pool.query("SELECT * FROM soupKitchens", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //GET a specific Soup Kitchen based on soupKitchenID
  //	/api/soupkitchen
  app.get('/api/soupkitchen', function (req, res) {
    var soupKitchenID = req.param('soupKitchenID');
    pool.query("SELECT * FROM soupKitchens WHERE soupKitchenID = ?", soupKitchenID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //POST a new soup kitchen
  // /api/soupkitchens
  app.post('/api/soupkitchens', async (req, res) => {
    var soupKitchenID = req.param('soupKitchenID');
    var userID = req.param('userID');
    var soupKitchenName = req.param('soupKitchenName')
    var address = req.param('address')

    pool.query("INSERT INTO soupKitchens (soupKitchenID, userID, soupKitchenName, address) VALUES (?,?,?,?)", 
    [soupKitchenID, userID, soupKitchenName, address],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

    //PUT all fields for a soup kitchen
    // /api/soupkitchen
    app.put('/api/soupkitchen', async (req, res) => {
      var soupKitchenID = req.param('soupKitchenID');
      var userID = req.param('userID');
      var soupKitchenName = req.param('soupKitchenName')
      var address = req.param('address')

      pool.query("UPDATE soupKitchens SET userID = ?, soupKitchenName = ?, address = ? WHERE soupKitchenID = ?", 
      [userID, soupKitchenName, address, soupKitchenID],function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format
      });
    });

    //PUT a new userID for a soup kitchen
  // /api/soupkitchen/updateUserID
  app.put('/api/soupkitchen/updateUserID', async (req, res) => {
    var soupKitchenID = req.param("soupKitchenID");
    var userID = req.param("userID");

    pool.query("UPDATE soupKitchens SET userID = ? WHERE soupKitchenID = ?", 
    [userID, soupKitchenID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new soupKitchenName for a soup kitchen
  // /api/soupkitchen/updateSoupKitchenName
  app.put('/api/soupkitchen/updateSoupKitchenName', async (req, res) => {
    var soupKitchenID = req.param("soupKitchenID");
    var soupKitchenName = req.param("soupKitchenName");

    pool.query("UPDATE soupKitchens SET soupKitchenName = ? WHERE soupKitchenID = ?", 
    [soupKitchenName, soupKitchenID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  //PUT a new address for a soup kitchen
  // /api/soupkitchen/updateAddress
  app.put('/api/soupkitchen/updateAddress', async (req, res) => {
    var soupKitchenID = req.param("soupKitchenID");
    var address = req.param("address");

    pool.query("UPDATE soupKitchens SET address = ? WHERE soupKitchenID = ?", 
    [address, soupKitchenID],function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

    //DELETE a particular delivery
  //  /api/soupkitchen
  app.delete('/api/soupkitchen', async (req, res) => {
    var soupKitchenID = req.param('soupKitchenID');
    pool.query("DELETE FROM soupKitchens WHERE soupKitchenID = ?", soupKitchenID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); 
      });
  });


//BRIGITTA'S ROUTES

//GET a paritcular user, given a userID
//	/api/user/:userID
//tested
app.get('/api/user/:userID', function (req, res) {
  var userID = req.param('userID');
  pool.query("SELECT * FROM users WHERE userID = ?", userID, function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//POST a new user - registering 
//  /api/users
//tested
app.post('/api/users', async (req, res) => {
  var userType = req.param("userType");
  var username = req.param("username");
  var userPassword = req.param("userPassword");
  var imgURL = req.param("imgURL");
  var phoneNumber = req.param("phoneNumber");
  var email = req.param("email");
  pool.query("INSERT INTO users (userType, username, userPassword, imgURL, phoneNumber, email, validated) VALUES (?,?,?,?,?,?,0)", 
  [userType, username, userPassword, imgURL, phoneNumber, email],function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); // Result in JSON format
  });
});

//tested
app.post('/api/login', function (req, res) {
  var username = req.body.username;
  var userPassword = req.body.userPassword;
  pool.query(`SELECT userID, userType FROM users WHERE username = ? && userPassword = ?`, [username, userPassword], function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//PUT to update users profile information given userID
// /api/users/:userID
//tested
app.put('/api/user/:userID', async (req, res) => {
  var userID = req.param('userID');
  var userType = req.param('userType');
  var username = req.param("username");
  var userPassword = req.param("userPassword");
  var imgURL = req.param("imgURL");
  var phoneNumber = req.param("phoneNumber");
  var email = req.param("email");
  pool.query("UPDATE users SET userType = ?, username = ?, userPassword = ?, imgURL = ?, phoneNumber = ?, email = ? WHERE userID = ?", 
  [userType, username, userPassword, imgURL, phoneNumber, email, userID],function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//PUT to update users validation given userID
// /api/users/updateValidated
//tested
app.put('/api/users/updateValidated', async (req, res) => {
  var userID = req.param('userID');
  var validated = req.param("validated");
  pool.query("UPDATE users SET validated = ? WHERE userID = ?", 
  [validated, userID],function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//GET foodDonationID, soupKitchen, driverID, foodName, timeMade, RDH_ID, expirationDate, quantity, and claimed for all foodDonations
//  /api/foodDonations
//tested
app.get('/api/foodDonations', function (req, res) {
  pool.query("SELECT f.foodDonationID, f.soupKitchenID, d.driverID, f.foodName, f.timeMade, f.RDH_ID, f.expirationDate, f.quantity, f.claimed FROM foodDonations f JOIN drivers d ON f.foodDonationID = d.foodDonationID", function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//GET a particular foodDonation, given foodDonationID
//  /api/foodDonations/:foodDonationID
//tested
app.get('/api/foodDonations/:foodDonationID', function (req, res) {
  var foodDonationID = req.param('foodDonationID');
  pool.query("SELECT * FROM foodDonations WHERE foodDonationID = ?", foodDonationID, function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//GET a particular user, given RDH_ID
//  /api/users/RDH
//tested
app.get('/api/rdhs/:RDH_ID', function (req, res) {
  var RDH_ID = req.param('RDH_ID');
  pool.query("SELECT u.userID, u.userType, u.username, u.userPassword, u.imgURL, u.phoneNumber, u.email, u.validated FROM users u INNER JOIN RDH r ON u.userID = r.userID WHERE RDH_ID = ?", RDH_ID, function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//POST a new donation 
//  /api/foodDonations
//tested
app.post('/api/foodDonations', async (req, res) => {
  var RDH_ID = req.param("RDH_ID");
  var soupKitchenID = req.param("soupKitchenID");
  var foodName = req.param("foodName");
  var foodCategory = req.param("foodCategory");
  var timeMade = req.param("timeMade");
  var expirationDate = req.param("expirationDate");
  var photoURL = req.param("photoURL");
  var preservationType = req.param("preservationType");
  var donationDescription = req.param("donationDescription");
  var quantity = req.param("quantity");  
  pool.query("INSERT INTO foodDonations (RDH_ID, soupKitchenID, foodName, foodCategory, timeMade, expirationDate, photoURL, preservationType, donationDescription, quantity) VALUES (?,?,?,?,?,?,?,?,?,?,0)", 
  [RDH_ID, soupKitchenID, foodName, foodCategory, timeMade, expirationDate, photoURL, preservationType, donationDescription, quantity],function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//DELETE a particular foodDonation given foodDonationID
//  /api/foodDonations
//tested
app.delete('/api/foodDonations', async (req, res) => {
  var foodDonationID = req.param("foodDonationID");
  pool.query("DELETE FROM foodDonations WHERE foodDonationID = ?", foodDonationID, function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
    });
});

//GET all users given a specified userType
//  /api/users/:userType
//tested
app.get('/api/users/:userType', function (req, res) {
  var userType = req.param("userType");
  pool.query("SELECT userID, username FROM users WHERE userType = ?", userType, function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//GET all RDH name and address and soup kitchen name and address given a userID
//  /api/RDHSoupKitchens/:userID
//tested
app.get('/api/RDHSoupKitchens/:foodDonationID', function (req, res) {
  var foodDonationID = req.param('foodDonationID');
  pool.query("SELECT r.RDH_name, r.address, s.soupKitchenName, s.address AS sAddress FROM foodDonations d INNER JOIN RDH r ON d.RDH_ID = r.RDH_ID INNER JOIN soupKitchens s ON d.soupKitchenID = s.soupKitchenID WHERE d.foodDonationID= ?", foodDonationID, function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

//PUT to update claimed field in foodDonations
// /api/foodDonations/updateClaimed
//tested
app.put('/api/foodDonations/updateClaimed', async (req, res) => {
  var foodDonationID = req.param('foodDonationID');
  var claimed = req.param("claimed");
  pool.query("UPDATE foodDonations SET claimed = ? WHERE foodDonationID = ?", 
  [claimed, foodDonationID],function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); 
  });
});

}
