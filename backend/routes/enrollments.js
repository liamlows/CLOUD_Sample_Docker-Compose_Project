const express = require('express');
const router = express.Router();
const pool = require('../db');
const {isUserAuthenticated, isUserAdmin} = require("../util");

router.use(isUserAuthenticated);

/* TODO

GET /api/enrollments/
    Gets all student enrollments.




POST /enrollments/
    Adds a new student enrollment
GET /enrollments/:student-id
    Gets all enrollments by student id.
PUT /enrollments/
    Updates an existing enrollment

GET /enrollments/courses/:course-id/waitlist/
    Gets all students in the wait list for the specified course ID.
POST /enrollments/courses/:course-id/waitlist/
    Adds a student to the wait list for the specified student ID and course ID.




 */

module.exports = router;
