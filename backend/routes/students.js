const express = require('express');
const router = express.Router();
const pool = require('../db');

/* TODO

GET /students/
    Gets all students.

GET /students/:student-id
    Gets the student with the specified student ID.

GET /schools/:school-id/students
    Gets all students at the specified school.

POST /students/
    Adds a new student into DB.

PUT /students/:student-id
    Updates student information in the DB.

 */

module.exports = router;
