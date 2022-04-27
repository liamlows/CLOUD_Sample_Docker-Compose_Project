const express = require('express');
const { query } = require('../db');
const pool = require('../db')

const router = express.Router();

const Followers = require('../controllers/followers');
const Comments = require('../controllers/comments');

  // GET ub/
  router.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // for messages
// Post: create a message ub/message 
router.post('/message', async (req, res, next) => {
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

// DELETE: ub/message/id
router.delete('/message/:id', async (req, res, next) => {
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

// Get: ub/message/id
router.get('/message/:send_id', async (req, res, next) => {
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

// GET: ub/message
router.get('/message', async (req, res, next) => {
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

// GET ub/followers returns list of user's followers
router.get('/followers', async (req, res, next) => {
  try {
    const user = req.user;
    const result = await Followers.getFollowers(user.id);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get followers: ", err);
  }

  next()
}) 

// GET ub/following returns list of who user is following
router.get('/following', async (req, res, next) => {
  try {
    const user = req.user;
    const result = await Followers.getFollowing(user.id);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get following: ", err);
  }

  next()
}) 

// POST ub/follow user follows given user
router.post('/follow', async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const result = await Followers.follow(body.id, user.id);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to follow user: ", err);
  }

  next()
}) 

// POST /ub/unfollow unfollows a user
router.post('/unfollow', async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const result = await Followers.unfollow(body.id, user.id);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to unfollow user: ", err);
  }

  next()
}) 

// POST ub/comment leaves a comment
router.post('/comment', async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const result = await Comments.postComment(user.id, body.nftID, body.comment);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to leave comment: ", err);
  }

  next()
}) 

// GET ub/comments returns all comments on an NFT
router.get('/comments', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await Comments.getComments(body.nftID);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get comments: ", err);
  }

  next()
}) 

// 
router.get('/numComments', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await Comments.getAmntComments(body.nftID);
    res.status(201).json(result);

  } catch (err) {
      console.error("Failed to get comments: ", err);
  }

  next()
}) 

// POST/nft
router.post('/nft', async (req, res, next) => {
  try {
      const user = req.user;
      const body = req.body;
      console.log(body);

      const result = await req.models.nft.createNFT(body.name, body.image_url, body.price, body.description, user.id, user.id, user.id, body.for_sale);
      res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create new NFT: ", err);
      // res.status(500).
  }
  next()
})

router.post('/transaction', async (req, res) => {
  try {
    const body = req.body;

    const result = await req.models.transaction.createTransaction(body.nft, body.buyer, body.seller, body.amount);
    res.status(201).json(result);

  } catch (err) {
    console.error("Failed to create transaction: ", err);
  }
})

router.get('/transaction/nft/:nft', async (req, res) => {
  try {
    const params = req.params;
    
    const result = await req.models.transaction.getTransaction1(params.nft);
    res.status(201).json(result);

  } catch (err) {
    console.error("Failed to get transaction by NFT id: ", err);
  }
})

router.get('/transaction/buyer/:buyer', async (req, res) => {
  try {
    const params = req.params;

    const result = await req.models.transaction.getTransaction2(params.buyer);
    res.status(201).json(result);

  } catch (err) {
    console.error("Failed to get transaction by NFT id: ", err);
  }
})

router.get('/transaction/seller/:seller', async (req, res) => {
  try {
    const params = req.params;

    const result = await req.models.transaction.getTransaction3(params.seller);
    res.status(201).json(result);

  } catch (err) {
    console.error("Failed to get transaction by NFT id: ", err);
  }
})

module.exports = router;