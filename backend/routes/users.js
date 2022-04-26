const express = require('express');
const User = require('../models/users');
const router = express.Router();
//1.3 create user
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await User.createNewUser(body.first_name, body.last_name, body.email, body.password, body.isFarmer);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

router.get('/:user_email', async(req, res) =>{
    try {
        const result = await User.userIDFromEmail(req.params.user_email);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get user ID:', err);
        res.status(500).json({ message: err.toString() });
    }
})

module.exports = router;
