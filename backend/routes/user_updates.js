const express = require('express');
const User = require('../models/users');
const router = express.Router();
//1.2 update user password
router.put('/password', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await User.updatePassword(body.user_id,body.newPassword);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to update password:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//1.6 delete account
router.delete('/deletion', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await User.deleteAccount(body.user_id);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete account:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;
