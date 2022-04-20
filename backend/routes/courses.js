const express = require('express');
const router = express.Router();
const pool = require('../db');
const {isUserAuthenticated, isUserAdmin, getSchoolById, validateBody} = require("../util");
const DAYS = ["MON", "TUES", "WED", "THR", "FRI", "SAT", "SUN", "REMOTE"];

router.use(isUserAuthenticated);

/* TODO: Implement the following

GET /api/courses/
    Gets all courses.


POST /api/courses/
    Adds a new course. Requires an admin/professor role.
GET /api/courses/:course-id
    Gets a course by ID

GET  /api/courses/metadata/

POST /courses/metadata/
    Adds a new course metadata entry. Requires an admin/professor role.

PUT /courses/metadata/
    Updates an existing course metadata entry. Requires an admin/professor role.

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
        professorId: req.body.professorId,
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
});

module.exports = router;