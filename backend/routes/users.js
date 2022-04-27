const express = require('express');
const User = require('../controllers/users');
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

// Check for payment info
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

// Add payment info
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

router.post('/update', async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await User.updateInfo(user.id, body.name, body.photo);
        res.status(200).json(result);
    } catch (err){
        console.error("Could not update info: ", err);
        res.sendStatus(401).json({ message: err.toString() });e
    }

});

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


});

module.exports = router;