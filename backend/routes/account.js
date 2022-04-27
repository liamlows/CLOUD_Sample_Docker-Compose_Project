const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

// POST /account/ creates a new user
router.post('/new', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await UserController.createUser(body.username, body.name, body.email, 
            body.password, 1, body.photo);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();
})

router.delete('/delete', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await UserController.deleteUserById(body.id);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to delete user:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();
})

router.post('/:id', async (req, res, next) => {
    try {
        const params = req.params;
        const body = req.body;
        console.log(body);
        var result;
        if (body.name != undefined) {
        result = await UserController.updateName(params.id, body.name); 
        }
        if (body.photo != undefined) {
        result = await UserController.updatePhoto(params.id, body.photo); 
        }  
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to delete user:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();
}) 


module.exports = router;