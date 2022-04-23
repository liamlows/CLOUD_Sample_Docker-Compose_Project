const express = require('express');
const router = express.Router();
const pool = require('../db');
const {isUserAuthenticated, isUserAdmin, getSchoolById, validateBody} = require("../util");
const {log} = require("@rama41222/node-logger");
const DAYS = ["MON", "TUES", "WED", "THR", "FRI", "SAT", "SUN", "REMOTE"];

const logger = log({ console: true, file: false, label: "courses api" });


router.use(isUserAuthenticated);

/* TODO: Implement the following
PUT /courses/metadata/
    Updates an existing course metadata entry. Requires an admin/professor role.

 */



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

    rows.forEach(course => {
        course.days = [];

        for(let i = 0; i < DAYS.length; i++){
            if(course.week_flags & (1 << (i + 1))){
                course.days.push(DAYS[i]);
            }
        }
    })

    res.status(200).json(rows);
});

/*
GET /api/courses/:course-id
    Gets a course by ID
*/
router.get("/:course_id", async (req, res, next) => {
    let courseId = req.params.course_id;

    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `courses` WHERE `course_id` = ?', [courseId, ]);
    } catch(error){
        return next(error);
    }

    if(rows.length === 0){
        res.status(404).json();
        return;
    }

    let course = rows[0];

    course.days = [];
    for(let i = 0; i < DAYS.length; i++){
        if(course.week_flags & (1 << (i + 1))){
            course.days.push(DAYS[i]);
        }
    }

    res.status(200).json(course);
});

/*
POST /api/courses/
    Adds a new course. Requires an admin/professor role.
*/
router.post("/", async (req, res, next) => {
    let requiredBody = {

    };
});

/*
GET  /api/courses/metadata/
 */
router.get("/metadata", async (req, res, next) => {
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `course_metadata`');
    } catch(error){
        return next(error);
    }

    res.status(200).json(rows);
});

/*
POST /courses/metadata/
    Adds a new course metadata entry. Requires an admin/professor role.
 */
router.post("/metadata", async (req, res, next) => {
    let requiredBody = {
        schoolId: req.body.schoolId,
        courseName: req.body.courseName,
        department: req.body.department,
        description: req.body.description,
    };

    let maxLengths = {
        courseName: 255,
        department: 255,
        description: 1000,
    };

    let optionalBody = {
        // professorId: req.body.professorId,
    };

    let body;
    try{
        body = validateBody(requiredBody, optionalBody, maxLengths);
    } catch(error) {
        res.status(400).json({error: error});
        return;
    }

    let school = await getSchoolById(body.schoolId);

    if(school === undefined){
        res.status(400).json({error: "Invalid school Id"});
        return;
    }

    let [rows, _] = await pool.execute('INSERT INTO `course_metadata`(school_id, course_name, department, description) VALUES (?, ?, ?, ?)');

    res.status(200).json({metadata: rows[0]});
});


router.post("/", async (req, res, next) => {
    let metadataId = req.body.metadataId;
    let maxSeats = req.body.maxSeats;
    res.status(200).json();
});

module.exports = router;