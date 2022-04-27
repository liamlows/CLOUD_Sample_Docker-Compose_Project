
const { query } = require('./db');
const pool = require('./db')

module.exports = function routes(app, logger) {

  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

// POST/nft
app.post('/nft', async (req, res, next) => {
  try {
      const body = req.body;
      console.log(body);

      const result = await req.models.nft.createNFT(body.name, body.image_url, body.price, body.description
        , body.creator_id, body.seller_id, body.owner_id, body.for_sale);
      res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create new NFT: ", err);
      // res.status(500).
  }
})

// POST: /nft/id
app.post('/nft/:id', async (req, res, next) => {
  try {
    const params = req.params;
    const body = req.body;

    var result;
    
    if (body.name != undefined) {
      result = await req.models.nft.updateName(params.id, body.name);
    }
    if (body.price != undefined) {
      result = await req.models.nft.updatePrice(params.id, body.price);
    }
    if (body.description != undefined) {
      result = await req.models.nft.updateDescription(params.id, body.description);
    }
    if (body.image_url != undefined) {
      result = await req.models.nft.updateImageUrl(params.id, body.image_url);
    }
    if (body.creator_id != undefined) {
      result = await req.models.nft.updateCreatorId(params.id, body.creator_id);
    } 
    if (body.seller_id != undefined) {
      result = await req.models.nft.updateSellerId(params.id, body.seller_id);
    } 
    if (body.owner_id != undefined) {
      result = await req.models.nft.updateOwnerId(params.id, body.owner_id);
    } 
    if (body.for_sale != undefined) {
      result = await req.models.nft.updateForSale(params.id, body.for_sale);
    }

    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create new NFT: ", err);
  }

  next()
})

// GET: /nft/id
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

app.get('/nft', async (req, res, next) => {
  try {

    const result = await req.models.nft.fetchNFT(); 
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get NFT: ", err);
      // res.status(500).
  }

  next()
})

// DELETE: /nft/id
app.delete('/nft/:id', async (req, res, next) => {
  try {

    const result = await req.models.nft.deleteNFT(req.params.id); 
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to delete NFT by id: ", err);
      // res.status(500).
  }

  next()
}) 


app.get('/nft/:min/:max/:how', async (req, res) => {
  try {
    const params = req.params;

    if (params.min === undefined) params.min = 0
    if (params.max === undefined) params.max = Infinity
    if (params.how === undefined) params.how = true

    const result = await req.models.nft.getAllByPrice(params.min, params.max, params.how);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get NFTs by price: ", err);
  }
})

app.get('/nft/search/:term', async (req, res) => {
  try {
    const term = req.params.term;

    const result = await req.models.nft.searchByTerm(term);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get NFTs by description: ", err);
  }
})


}