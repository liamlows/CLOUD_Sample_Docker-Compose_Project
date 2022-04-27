const express = require('express');
const { query } = require('../db');
const pool = require('../db')

const router = express.Router();


  // GET /
  router.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // for messages
// Post: create a message /message 
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

// DELETE: /message/id
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

// Get: /message/id
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

// GET: /message
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

// for like record
// POST /like
router.post('/like', async (req, res) => {
  try {
      const body = req.body;
      console.log(body);

      const result = await req.models.likeRecord.createLikeRecord(body.liked_nft, body.liked_user_id);
      res.status(201).json(result);

  } catch (err) {
      console.error("Failed to create new like record: ", err); 
  }
}) 

module.exports = router;