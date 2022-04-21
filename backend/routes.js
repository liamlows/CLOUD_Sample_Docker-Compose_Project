
const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });


app.post('/nft', async (req, res, next) => {
  try {
      const body = req.body;
      console.log(body);

      const result = await req.models.nft.createNFT(body.name, body.image_url, body.price, body.description);
      res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create new NFT: ", err);
      // res.status(500).
  }
})

app.get('/nft', async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);

    const result = await req.models.nft.getNFT(body.name);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create get NFT by name: ", err);
      // res.status(500).
  }
})


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

  // // GET /checkdb
  // app.get('/values', (req, res) => {
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           logger.error("Error while fetching values: \n", err);
  //           res.status(400).json({
  //             "data": [],
  //             "error": "Error obtaining values"
  //           })
  //         } else {
  //           res.status(200).json({
  //             "data": rows
  //           });
  //         }
  //       });
  //     }
  //   });
  // });
}

