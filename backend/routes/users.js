const express = require('express');
const User = require('../controllers/users');
const Likes = require('../controllers/likeRecord');
const NFT = require('../controllers/nft');
// const Purchase = require('../controllers/purchases');

const router = express.Router();

// GET /users/current find the current user by using token
router.get('/current', async (req, res, next) => {
    try {
        const user = req.user;
        const result = await User.findUserByEmail(user.email);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current user:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
});

// GET /users/session validates the current token
router.get('/session', async (req, res, next) => {
    try {
        const user = req.user;
        const result = await User.findUserByEmail(user.email);
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        console.error('No matching user: ', err);
        res.sendStatus(401).json({ message: err.toString() });
    }
}); 

// GET users/purchase purchases an NFT
router.get('/purchase', async (req, res, next) => {
    try {
        const user = req.user;
        const boyd = req.body;
        const result = await User.purchaseNFT(user.id, body.nft);
        res.status(200).json(result);
    } catch(err){
        console.error('No payment info available: ', err);
        res.sendStatus(404).json({ message: err.toString() });
    }

});

// POST users/paymentInfo adds payment info
router.post('/paymentInfo', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        console.log(body);
        const result = await User.paymentInfo(user.id, body.type, body.num, body.name, body.cvv, body.exp);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not add payment information: ", err);
        res.sendStatus(403).json({ message: err.toString() });
    }

});

// GET users/balance checks user balance
router.get('/balance', async (req, res, next) => {
    try {
        const user = req.user;
        const result = await User.balance(user.id);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not get balance: ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});

// POST users/transfer transfers funds to account
router.post('/transfer', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await User.transfer(user.id, body.amount);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not transfer funds: ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }
});

// POST users/update updates user profile
router.post('/update', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await User.updateInfo(user.id, body.email, body.username, body.password, body.name, body.photo);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not update info: ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});
// POST users/hide hides an NFT from the user's profile
router.post('/hide', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await User.hideNFT(user.id, body.nftID);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not hide NFT: ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});
// GET users/list returns a list of users with given params
router.get('/list', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await User.userSearch(body.username, body.id, body.email);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not get users: ", err);
        res.sendStatus(404).json({ message: err.toString() });e
    }
});

// POST users/like likes an NFT
router.post('/like', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await Likes.likeNFT(body.nftID, user.id);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not like NFT; ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});

// GET users/likeRecord gets the like record for a given NFT
router.get('/likeRecord', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await Likes.gerLikeRecord(body.nftID, user.id);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not view like record; ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});
// GET users/likeCount returns the like count for a given NFT
router.get('/likeCount', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await Likes.getLikeNum(body.nftID);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not view like num; ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});

// DELETE: users/nft/id deletes the nft
router.delete('/nft/id/:id', async (req, res, next) => {
  try {
      const result1 = await req.models.nft.getOwnerId;
      if(result1 === req.user.id){
            const result = await req.models.nft.deleteNFT(req.params.id); 
            res.status(201).json(result);
      }

  } catch (err) {
      console.error("Failed to delete NFT by id: ", err);
      // res.status(500).
  }

  next()
}) 

// POST users/updateNFT updates nFT information
router.post('/updateNFT', async (req, res, next) => {
  try {
      const result1 = await NFT.getOwnerId;
      if(result1 === req.user.id){
            const result = await NFT.modifyNFT(body.id, body.name, body.image_url, body.price, body.description, body.creator_id, body.seller_id, body.owner_id, body.for_sale);
            res.status(201).json(result);
      }

  } catch (err) {
      console.error("Failed to delete NFT by id: ", err);
      // res.status(500).
  }

  next()
}) 



module.exports = router;