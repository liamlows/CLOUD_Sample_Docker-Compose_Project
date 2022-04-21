const express = require('express');
const User = require('../models/users');
const router = express.Router();
//update user password
router.put('/password', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.user.updatePassword(body.email,body.newPassword);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to update password:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//delete account
router.delete('/deletion', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await req.models.user.deleteAccount(body.email);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete account:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;