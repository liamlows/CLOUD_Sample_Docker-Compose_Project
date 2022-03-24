const express = require('express');
const router = express.Router();
const pool = require('../db');
const promisePool = pool.promise();
const secret = 'not-a-secret';
const crypto = require('crypto');

// POST /account/register
router.post("/register", async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    // Check for required parameters
    if(username === undefined || password === undefined){
        res.status(400).send();
        return;
    }

    // Hash password
    const hash = crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

    // Query DB for an already existing account
    let rows, fields;
    try{
        [rows, fields] = await promisePool.execute('SELECT * FROM `account` WHERE `username` = ?', [username]);
    } catch(error){
        return next(error);
    }

    if(rows.length !== 0){
        // Account already exists.
        res.status(200).json({success: 0, error: "An account already exists with that username."}).send();
        return;
    }

    // Insert new account into DB
    try {
        await promisePool.execute('INSERT INTO `account`(username, password, first_name, last_name, school_id) VALUES (?, ?, ?, ?, ?)',
            [username, hash, "", "", 1]);
    } catch (error) {
        return next(error);
    }

    // TODO: session cookies?

    res.status(200).json({success: 1, error: ""}).send();
});


// POST /account/login
router.post("/login", async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    // Check for required parameters
    if(username === undefined || password === undefined){
        res.status(400).send();
        return;
    }

    // Hash password
    const hash = crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

    // Query DB for credentials
    let rows, fields;
    try{
        [rows, fields] = await promisePool.execute('SELECT * FROM `account` WHERE `username` = ? AND `password` = ?',
            [username, hash]);
    } catch(error){
        return next(error);
    }


    res.status(200);

    if(rows.length === 0){
        res.json({"success": 0, "error": "Invalid credentials."}).send();
        return;
    }

    res.json({"success": 1, "error": ""}).send();
});


module.exports = router;
