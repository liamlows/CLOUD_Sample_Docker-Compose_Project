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


module.exports = router;