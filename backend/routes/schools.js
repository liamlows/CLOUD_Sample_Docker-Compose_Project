const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /schools/
// Gets all schools in the database.
router.get("/", async (req, res, next) => {
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `school`');
    } catch(error){
        return next(error);
    }

    res.status(200).json(rows).send();
});

// POST /schools/
// Adds a new school to the database. Requires an admin role.
router.post("/", async (req, res, next) => {
    // TODO
    res.status(404).send();
});


// GET /schools/:id
// Gets a school by ID.
router.get("/:id", async (req, res, next) => {
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `school` WHERE school_id = ? LIMIT 1', [req.params.id]);
    } catch(error){
        return next(error);
    }

    if(rows.length){
        res.status(200).json(rows[0]).send();
    }
    else{
        return res.status(404).send();
    }
});

// PUT /schools/:id
// Updates an existing school in the database. Requires an admin role.
router.put("/:id", async (req, res, next) => {
    // TODO
    res.status(404).send();
});

module.exports = router;