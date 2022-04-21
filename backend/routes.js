
const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });


app.post('/uploadnft', (req, res) => {
    console.log(req.body)
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        connection.query('INSERT INTO `nft_marketplace`.`nft` (name, image_url) VALUES (\'' + req.body.name + ', ' + req.body.image_url + '\')', function(err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Failed to insert NFT into table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body} to the table!`);
          }
        })
      }
    })
})

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

};