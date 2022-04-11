const express = require('express');
const router = express.Router();
const pool = require('../db');

/* TODO: Implement the following

GET /courses/
    Gets all courses.
POST /courses/
    Adds a new course. Requires an admin/professor role.
GET /courses/:course-id
    Gets a course by ID

GET /courses/metadata/:course-meta-id
    Get course metadata by ID

POST /courses/metadata/
    Adds a new course metadata entry. Requires an admin/professor role.

PUT /courses/metadata/
    Updates an existing course metadata entry. Requires an admin/professor role.

 */

module.exports = router;