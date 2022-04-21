const jwt = require('jsonwebtoken');
const knex = require('../knex');
const bcrypt = require('bcryptjs');

const USER_TABLE = 'user';

const accessTokenSecret =  process.env.TOKEN;

// Creates a new system user with a secure password
const createNewUser = async (username, name, email, password, privileges) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);

    // Inserts into user table
    const query = knex(USER_TABLE).insert({ username, name, email, password: hashedPassword, privileges });
    const result = await query;
    return result;
};

// Locates a user record by email
const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email });
    const result = await query;
    return result;
}

const getAdmin = async (email) => {
    const query = knex(USER_TABLE).where({ email }).whereRaw('privileges = 2');
    const result = await query;
    return result;
}

// Authenticates user and returns a JWT
const authenticateUser = async (email, password) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    // If user does not exist, logs a relevant error
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        knex.closeknex();
        return null;
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    // If the password is valid, returns a JWT
    if (validPassword) {
        delete user.password;
        const admin = await getAdmin(email);
        if(admin.length === 0){
            return jwt.sign({ ...user, claims: ['user'] }, accessTokenSecret);
        } else {
            return jwt.sign({ ...user, claims: ['admin'] }, accessTokenSecret);
        }
    // If the password is invalid, logs a relevant error
    } else {
        console.error(`Invalid password.`);
        throw EvalError;
    }
}


module.exports = {
    createNewUser,
    findUserByEmail,
    authenticateUser
};