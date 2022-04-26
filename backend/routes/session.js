const express = require('express');
const User = require('../models/users');
/**
 * https://expressjs.com/en/guide/routing.html#express-router
 * 
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */
const router = express.Router();
//1.4 and 1.5
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        
        const result = await User.authenticateUser(body.email, body.password);
        if(result === null){
            res.status(500).json({ message: 'Invalid login information' });
        }
        else{
            res.status(201).json(result);
        }
    } catch (err) {
        console.error('Failed to create new session:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;

