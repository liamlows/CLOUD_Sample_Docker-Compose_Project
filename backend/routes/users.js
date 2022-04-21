const express = require('express');
const User = require('../models/users');
const router = express.Router();
//1.3 create user
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.user.createNewUser(body.email, body.password, body.type);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;
