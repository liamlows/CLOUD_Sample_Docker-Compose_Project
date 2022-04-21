
const { query } = require('./db');
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


app.post('/nft/:id', async (req, res, next) => {
  try {
    const params = req.params;
    const body = req.body;

    var result;
    
    if (body.name != undefined) {
      result = await req.models.nft.update(params.id, body.name);
    }
    if (body.price != undefined) {
      result = await req.models.nft.update(params.id, body.price);
    }
    if (body.description != undefined) {
      result = await req.models.nft.update(params.id, body.description);
    }

    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create new NFT: ", err);
  }

  next()
})

app.get('/nft/:id', async (req, res, next) => {
  try {

    const result = await req.models.nft.getNFT(req.params.id);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create get NFT by name: ", err);
      // res.status(500).
  }

  next()
})


}