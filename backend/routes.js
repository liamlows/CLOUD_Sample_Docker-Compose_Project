
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

  // for messages
// Post: create a message /message 
app.post('/message', async (req, res, next) => {
  try {
      const body = req.body;
      console.log(body);
      const result = await req.models.messages.createMessage(body.message,body.send_id,body.recieve_id);
      //const result = await req.models.message.createMessage(body.message, body.send_id, body.recieve_id);
      res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create new message: ", err);
      // res.status(500).
  } 
}) 

// DELETE: /message/id
app.delete('/message/:id', async (req, res, next) => {
  try {

    const result = await req.models.messages.deleteMessage(req.params.id);
    res.status(201).json(result);
    //res.status(201).json(result);

  } catch (err) {
      console.error("Failed to delete message by id: ", err);
      // res.status(500).
  }

  next()
})

// Get: /message/id
app.get('/message/:send_id', async (req, res, next) => {
  try {

    const result = await req.models.messages.getMessage(req.params.send_id);
    res.status(201).json(result);
    //res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get message by send id: ", err);
      // res.status(500).
  }

  next()
})

// GET: /message
app.get('/message', async (req, res, next) => {
  try {

    const result = await req.models.messages.fetchMessage();
    res.status(201).json(result);
    //res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get message: ", err);
      // res.status(500).
  }

  next()
})  


}