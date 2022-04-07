const knex = require('../knex');
const bcrypt = require('bcryptjs');

const USER_TABLE = 'user';

const createNewUser = async (username, email, name, password) => {
    console.log('Raw password:', password);
    const salt = bcrypt.genSaltSync(1);
    console.log('Password salt', salt);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log('Hashed password', hashedPassword);

    const query = knex(USER_TABLE).insert({username, email, name, password: hashedPassword });
    console.log('Raw query for createNewUser:', query.toString());
    const result = await query;

    return result;
};

const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email });
    const result = await query;
    return result;
}

const authenticateUser = async (email, password) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return false;
    }
    const user = users[0];
    console.log("User = ", user);
    const validPassword = await bcrypt.compare(password, user.password);

    console.log('Results of password authentication: ', validPassword);
    if (validPassword) {
        return true;
    }
    return false;
}

const userRole = async (email) => {
    const query = knex(USER_TABLE).select('role').where({ email });
    const result = await query;
    return result;
}


module.exports = {
    createNewUser,
    findUserByEmail,
    authenticateUser,
    userRole
};