const pool = require("./db");

const STUDENT_ROLE_TYPE = 'student';
const TA_ROLE_TYPE = 'ta';
const PROFESSOR_ROLE_TYPE = 'professor';
const ADMIN_ROLE_TYPE = 'admin';

exports.STUDENT_ROLE_TYPE = STUDENT_ROLE_TYPE;
exports.TA_ROLE_TYPE = TA_ROLE_TYPE;
exports.PROFESSOR_ROLE_TYPE = PROFESSOR_ROLE_TYPE;
exports.ADMIN_ROLE_TYPE = ADMIN_ROLE_TYPE;


async function isUserAuthenticated(req, res, next){
    if(req.session.username){
        return next();
    }
    else{
        res.sendStatus(401);
    }
}

async function isUserAdmin(req, res, next) {
    if(req.session.roleType === "admin") {
        return next();
    }
    else {
        res.sendStatus(403);
    }
}


exports.getSchoolById = async (schoolId) => {
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `school` WHERE school_id = ? LIMIT 1', [req.params.id]);
    } catch(error){
        return undefined;
    }

    return rows[0];
}

exports.isUserAuthenticated = isUserAuthenticated;
exports.isUserAdmin = isUserAdmin;


exports.getUsernameFromId = async (accountId) => {
    try {
        let [rows, fields] = await pool.execute(
            'SELECT username FROM `accounts` WHERE account_id = ? LIMIT 1', [accountId]);

        if(rows.length) {
            return rows[0].username;
        }
        else {
            return undefined;
        }

    } catch(error) {
        return undefined;
    }
}


exports.validateBody = (requiredBody, optionalBody={}, maxLengths={}) => {
    for (const property in requiredBody) {
        console.log(property + "  " + requiredBody[property]);
        if(requiredBody[property] === undefined){
            throw `Missing ${property} in request.`;
        }
    }

    for (const property in optionalBody) {
        if(optionalBody[property] === undefined) {
            optionalBody[property] = null;
        }
    }


    let body = {
        ...requiredBody,
        ...optionalBody
    };

    for(const property in body) {
        if(maxLengths[property] === undefined)
            continue;

        if(typeof body[property] !== "string"){
            throw `Field ${property} must be a string.`;
        }

        if(body[property].length >= maxLengths[property]){
            throw `Field ${property} is too long. Must be less than ${maxLengths[property]} characters.`;
        }
    }

    return body;
};
