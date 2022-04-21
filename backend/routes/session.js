const express = require('express');
const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');
const UserController = require('../controllers/users');

const router = express.Router();

// POST /session/ attempts to create a new session
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await UserController.authenticateUser(body.email, body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to authenticate user:', err);
        res.status(401).json({ message: err.toString() });
    }
    next();
})

module.exports = router;

