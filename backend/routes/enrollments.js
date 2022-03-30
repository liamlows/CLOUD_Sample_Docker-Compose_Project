const express = require('express');
const router = express.Router();
const pool = require('../db');

/* TODO

GET /enrollments/
    Gets all student enrollments.
POST /enrollments/
    Adds a new student enrollment
GET /enrollments/students/:student-id
    Gets all enrollments by student id.
GET /enrollments/courses/:course-id
    Gets all enrollments by course id.
PUT /enrollments/:enrollment-id
    Updates an existing enrollment

GET /enrollments/courses/:course-id/waitlist/
    Gets all students in the wait list for the specified course ID.
POST /enrollments/courses/:course-id/waitlist/
    Adds a student to the wait list for the specified student ID and course ID.
 */

module.exports = router;
