const express = require('express');
const User = require('../controllers/users');

const router = express.Router();

// GET /users/session validates the current token
router.get('/session', async (req, res, next) => {
    try {
        const user = req.user;
        const result = await User.findUserByEmail(user.email);
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        console.error('No matching user:', err);
        res.sendStatus(401).json({ message: err.toString() });
    }
});

module.exports = router;

