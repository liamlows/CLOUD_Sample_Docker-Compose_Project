const express = require('express');
const router = express.Router();
const pool = require('../db');
const {isUserAuthenticated, isUserAdmin, getSchoolById, validateBody,
    parseWeekFlags, validateDates, validateTimes, getCourseById} = require("../util");
const {log} = require("@rama41222/node-logger");

router.use(isUserAuthenticated);

/*
GET /api/courses/
    Gets all courses.
 */
router.get("/", async (req, res, next) => {
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `courses`');
    } catch(error){
        return next(error);
    }

    rows.forEach(parseWeekFlags);
    res.status(200).json(rows);
});

/*
GET /api/courses/:course-id
    Gets a course by ID
*/
router.get("/:course_id", async (req, res, next) => {
    let courseId = req.params.course_id;
    let course = await getCourseById(courseId);

    if(course === undefined){
        res.status(404).json("Course not found");
        return;
    }
    parseWeekFlags(course);

    res.status(200).json(course);
});

/*
POST /api/courses/
    Adds a new course. Requires an admin/professor role.
*/
router.post("/", async (req, res, next) => {
    let requiredBody = {
        metadataId: req.body.metadataId,
        maxSeats: req.body.maxSeats,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        weekFlags: req.body.weekFlags,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
    };

    let optionalBody = {
        cancelled: false,
    };

    let maxLengths = {};

    let body;
    try{
        body = validateBody(requiredBody, optionalBody, maxLengths);
        validateDates({
            startDate: body.startDate, endDate: body.endDate});
        validateTimes({
            startTime: body.startTime, endTime: body.endTime});
    } catch(error) {
        res.status(400).json({error: error});
        return;
    }

    let [result, _] = await pool.execute('INSERT INTO `courses`(school_id, course_name, department, description) VALUES (?, ?, ?, ?)');

    res.status(200).json({courseId: result.insertId});
});


module.exports = router;