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
        res.status(401).send();
    }
}

async function isUserAdmin(req, res, next) {
    if(req.session.roleType === "admin") {
        return next();
    }
    else {
        res.status(403).next();
    }
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
