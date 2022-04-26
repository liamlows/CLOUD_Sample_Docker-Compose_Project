// Message board and leaderboard routes go here

const express = require('express');

const router = express.Router();

// POST /session/ attempts to create a new session
router.get('/', async (req, res, next) => {
    try {
        const responseBody = "Good :)";
        res.status(201).json(responseBody);
    } catch (err){
        console.error('Error:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
    
});

module.exports = router;