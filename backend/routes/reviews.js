const express = require('express');
const router = express.Router();
const pool = require('../db');
const {validateBody} = require("../util");

router.post("/course_reviews/", async (req, res, next) => {

    let requiredBody = {
        course_id: req.body.course_id,
        review: req.body.review,
        rating: req.body.rating,
        poster_i: req.body.poster_id
    }
    let optionalBody = {};
    let maxLengths = {};
    let body;
    try{
        body = validateBody(requiredBody, optionalBody, maxLengths);
    } 
    catch(error){
        res.status(400).json({error: error});
        return;
    } 

    await pool.execute('INSERT INTO `course_reviews`(course_id, review, rating, poster_id) VALUES(?, ?, ?, ?)',
     [body.course_id, body.review, body.rating, body.poster_id]);

    res.status(200).send();
});

router.post("/teacher_reviews/", async (req, res, next) => {
    let teacher_id = req.teacher_id
    let review = req.review
    let rating = req.rating
    let poster_id = req.poster_id
    let flagged = req.flagged

    await pool.execute('INSERT INTO `teacher_reviews`(teacher_id, review, rating, poster_id, flagged) VALUES(?, ?, ?, ?, ?)', [course_id, review, rating, poster_id, flagged]);

    res.status(200).send();
});

module.exports = router;