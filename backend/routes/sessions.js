// const express = require('express');

// /**
//  * https://expressjs.com/en/guide/routing.html#express-router
//  * 
//  * A router is a special Express object that can be used to define how to route and manage
//  * requests. We configure a router here to handle a few routes specific to students
//  */
// const router = express.Router();

// router.post('/', async (req, res, next) => {
//     try {
//         const body = req.body;
        
//         const result = await req.models.user.authenticateUser(body.emaila, body.password);
//         res.status(201).json(result);
//     } catch (err) {
//         console.error('Failed to create new user:', err);
//         res.status(500).json({ message: err.toString() });
//     }

//     next();
// })

// module.exports = router;