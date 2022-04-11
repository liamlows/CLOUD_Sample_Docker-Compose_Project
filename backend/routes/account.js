const express = require('express');
const router = express.Router();
const pool = require('../db');
const secret = 'not-a-secret';
const crypto = require('crypto');
const util = require('../util');

/* TODO

PUT /users/:username/student
    Sets the student ID on the account.

PUT /users/:username/role
    Assigns role ID for the account.

GET /users/:username/status

 */

async function findRole(roleType, schoolId, courseId){
    let rows, fields;

    if(schoolId && courseId){
        [rows, fields] = await pool.execute('SELECT * FROM `roles` WHERE `role_type` = ? AND `school_id` = ? AND `course_id` = ?',
            [roleType, schoolId, courseId]);
    }
    else if(schoolId) {
        [rows, fields] = await pool.execute('SELECT * FROM `roles` WHERE `role_type` = ? AND `school_id` = ? AND `course_id` IS NULL',
            [roleType, schoolId,]);
    }
    else if(courseId) {
        console.log("Must specify school when using course ID for role.");
        return [];
    }
    else {
        [rows, fields] = await pool.execute('SELECT * FROM `roles` WHERE `role_type` = ? AND `school_id` IS NULL AND `course_id` IS NULL',
            [roleType, ]);
    }

    return rows;
}

async function getGlobalAdminRole(){
    let roles = await findRole(util.ADMIN_ROLE_TYPE, null, null);
    if (!roles.length) {
        await createRole(util.ADMIN_ROLE_TYPE, null, null);
        roles = await findRole(util.ADMIN_ROLE_TYPE, null, null);
    }

    return roles[0]["role_id"];
}

async function createRole(roleType, schoolId, courseId){
    try{
        await pool.execute('INSERT INTO `roles`(role_type, course_id, school_id) VALUES (? ? ?)',
            [roleType, courseId, schoolId]);
    } catch(error){
        return false;
    }

    return true;
}


async function updateLoginStatus(username) {
    await pool.execute('UPDATE `accounts` SET `last_logged_in` = ?, `logged_in` = 1 WHERE `username` = ?',
        [new Date(), username]);
}

async function updateLogoutStatus(username) {
    await pool.execute('UPDATE `accounts` SET `logged_in` = 0 WHERE `username` = ?',
        [username]);
}

// POST /account/register
router.post("/api/account/register", async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    // Check for required parameters
    if(username === undefined || password === undefined){
        res.status(400).send();
        return;
    }

    // Optional parameters
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let schoolId = undefined; // req.body.schoolId;
    let roleId;

    if (firstName === undefined){
        firstName = "";
    }
    if(lastName === undefined) {
        lastName = "";
    }

    if(schoolId === undefined) {
        schoolId = null;
    }

    if(schoolId === null){
        try {
            roleId = await getGlobalAdminRole();
        } catch(error) {
            return next(error);
        }
    }

    // Hash password
    const hash = crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

    // Query DB for an already existing account
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `accounts` WHERE `username` = ?', [username]);
    } catch(error){
        return next(error);
    }

    if(rows.length !== 0){
        // Account already exists.
        res.status(200).json({success: 0, error: "An account already exists with that username."}).send();
        return;
    }

    if(schoolId !== null){
        // Check if school exists
        try{
            [rows, fields] = await pool.execute('SELECT * FROM `school` WHERE `school_id` = ?', [schoolId]);
        } catch(error){
            return next(error);
        }

        // School does not exist
        if(rows.length === 0){
            res.status(200).json({success: 0, error: `School with ID ${schoolId} does not exist.`}).send();
            return;
        }
    }

    // Insert new account into DB
    try {
        await pool.execute('INSERT INTO `accounts`(username, password, first_name, last_name, school_id, role_id) VALUES (?, ?, ?, ?, ?, ?)',
            [username, hash, firstName, lastName, schoolId, roleId]);
    } catch (error) {
        return next(error);
    }

    res.status(200).json({success: 1, error: ""}).send();
});


// POST /account/login
router.post("/api/account/login", async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    // Check for required parameters
    if(username === undefined || password === undefined){
        res.status(400).send();
        return;
    }

    // Hash password
    const hash = crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

    // Query DB for credentials
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `accounts` WHERE `username` = ? AND `password` = ?',
            [username, hash]);
    } catch(error){
        return next(error);
    }

    res.status(200);

    if(rows.length === 0){
        res.json({success: 0, error: "Invalid credentials."}).send();
        return;
    }
    else if(rows.length > 1){
        res.json({success: 0, error: "Multiple accounts with same credentials"}).send();
        return;
    }

    let user = rows[0];
    let studentId = -1;
    if(user.studentId){
        studentId = user.studentId;
    }

    // This initializes the login session.
    req.session.username = username;
    req.session.studentId = studentId;
    res.cookie('username', username);
    res.cookie('studentId', studentId);

    try {
        await updateLoginStatus(username);
    } catch(error) {
        return next(error);
    }

    res.json({success: 1, error: "", username: username}).send();
});


// GET /account/logout
router.get("/api/account/logout", async (req, res, next) => {
    // Clear the login session.

    let username = req.session.username;

    res.cookie('username', "");

    try {
        await updateLogoutStatus(username);
    } catch(error) {
        return next(error);
    }

    req.session.destroy((err) => {
        if(err) return next(err);
        res.status(200).send();
    });
});


router.get("/api/users/:username", async (req, res, next) => {
    // Query DB for user
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `accounts` WHERE `username` = ?',
            [req.params.username]);
    } catch(error){
        return next(error);
    }

    if(rows.length === 0){
        res.status(404).send();
        return;
    }

    let user = rows[0];

    res.status(200).json({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        studentId: user.student_id
    }).send();
});

router.get("/api/users/", async (req, res, next) => {
    // Query DB for user
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT username, first_name, last_name, student_id FROM `accounts`');
    } catch(error){
        return next(error);
    }

    res.status(200).json(rows).send();
});

router.get("/api/users/:username/status/", async (req, res, next) => {
    // Query DB for user
    let rows, fields;
    try{
        [rows, fields] = await pool.execute(
            'SELECT username, last_logged_in, logged_in FROM `accounts` WHERE `username` = ?',
            [req.params.username]);
    } catch(error){
        return next(error);
    }

    if(rows.length === 0){
        res.status(404).send();
        return;
    }

    let user = rows[0];
    res.status(200).json(user).send();
});


module.exports = router;
