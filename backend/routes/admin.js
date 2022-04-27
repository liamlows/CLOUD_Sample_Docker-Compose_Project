const express = require('express');
const UserController = require('../controllers/users');
const AdminController = require('../controllers/admin');

const router = express.Router();

// POST /admin/new creates a new admin account
router.post('/new', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await UserController.createUser(body.username, body.name, body.email, body.password, 2, body.photo);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new admin:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();
})

// Block a given user from posting on messageboard or appearing on leaderboard
router.post('/block', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await AdminController.blockUser(body.email);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new admin:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();

})

// Disable a given users account
router.post('/disable', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await AdminController.disableUser(body.email);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new admin:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();

})

// Enable a given users account
router.post('/enable', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await AdminController.enableUser(body.email);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new admin:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();

})


// Promote a given users account to admin
router.post('/promote', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await AdminController.promoteUser(body.email);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new admin:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();

})

router.post('/update', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await AdminController.updateInfo(user.id, body.id, body.name, body.photo);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not update info: ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});

router.post('/delete', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await AdminController.deleteComment(body.id);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not delete comment: ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});

// DELETE: /admin/nft/id
router.delete('/nft/id/:id', async (req, res, next) => {
  try {
        const result = await req.models.nft.deleteNFT(req.params.id); 
        res.status(201).json(result);

  } catch (err) {
      console.error("Failed to delete NFT by id: ", err);
      // res.status(500).
  }

  next()
}) 

// POST /admin/updateNFT
router.post('/updateNFT', async (req, res, next) => {
  try {
        const result = await NFT.modifyNFT(body.id, body.name, body.image_url, body.price, body.description, body.creator_id, body.seller_id, body.owner_id, body.for_sale);
        res.status(201).json(result);

  } catch (err) {
      console.error("Failed to delete NFT by id: ", err);
      // res.status(500).
  }

  next()
}) 



module.exports = router;