const express = require('express');
const router = express.Router();
const pool = require('../db');
const {isUserAuthenticated, isUserAdmin, getCourseById} = require("../util");

router.use(isUserAuthenticated);

/* TODO

GET /api/wait-list/:course-id/
    Gets all students in the wait list for the specified course ID.
POST /api/wait-list/:course-id/
    Adds a student to the wait list for the specified student ID and course ID.
 */


async function getEnrollmentsByAccount(accountId){
    let [rows, fields] = await pool.execute('SELECT * FROM `enrollments` WHERE `account_id` = ?', [accountId]);
    return rows;
}


/*
GET /api/enrollments/
    Gets all student enrollments.
 */
router.get("/", async (req, res, next) => {
    let courseId = req.query.courseId;

    let rows, fields;
    try {
        if(courseId !== undefined){
            [rows, fields] = await pool.execute('SELECT * FROM `enrollments` WHERE course_id = ?', [courseId]);
        }
        else {
            [rows, fields] = await pool.execute('SELECT * FROM `enrollments`');
        }

    } catch(error) {
        return next(error);
    }

    return res.status(200).json(rows);
});

/*
GET /enrollments/:student-id
    Gets all enrollments by student id.
 */
router.get("/:student_id", async (req, res, next) => {
    let accountId = req.params.accountId;

    let enrollments;
    try{
        enrollments = await getEnrollmentsByAccount(accountId);
    } catch (error) {
        return next(error);
    }

    res.status(200).json(enrollments);
});

/*
POST /enrollments/
    Adds a new student enrollment to the current user
 */
router.post("/", async (req, res, next) => {
    let accountId = req.session.accountId;
    let courseId = req.body.courseId;
    if(courseId === undefined){
        res.status(400).json("Missing courseId");
        return;
    }

    let course = await getCourseById(courseId);
    if(course === undefined){
        res.status(400).json(`Course ${courseId} not found`)
        return;
    }

    let rows, fields;
    try{
        [rows, fields] = await pool.execute(
            'SELECT * FROM `enrollments` WHERE `account_id` = ? AND `course_id` = ?',
            [accountId, courseId]);
    } catch(error){
        return next(error);
    }

    if(rows.length !== 0){
        res.status(400).json("Already enrolled with that course.");
        return;
    }

    await pool.execute('INSERT INTO `enrollments`(account_id, course_id) VALUES(?, ?)', [accountId, courseId]);

    res.status(200).send();
});

/*
DELETE /api/enrollments/:account_id/:course_id

Deletes the specified enrollment.
 */
router.delete("/:account_id/:course_id", async (req, res, next) => {
    let accountId = req.params.account_id;
    let courseId = req.params.course_id;

    let result, fields;
    try{
        [result, fields] = await pool.execute(
            'DELETE FROM `enrollments` WHERE `account_id` = ? AND `course_id` = ?',
            [accountId, courseId]);
    } catch(error){
        return next(error);
    }

    if(result.affectedRows === 0){
        res.status(404).json("No enrollment found");
        return;
    }

    res.status(200).json();
});

module.exports = router;
