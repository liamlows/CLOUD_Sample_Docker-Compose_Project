const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post("/course_reviews/", async (req, res, next) => {
    let course_id = req.course_id
    let review = req.review
    let rating = req.rating
    let poster_id = req.poster_id

    await pool.execute('INSERT INTO `course_reviews`(course_id, review, rating, poster_id) VALUES(?, ?, ?, ?)', [course_id, review, rating, poster_id]);

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