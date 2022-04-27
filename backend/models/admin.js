const knex = require('../knex');

const USER_TABLE = 'user';

const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email }).where("privileges", 2);
    const result = await query;
    return result;
}

const findUserByID = async (id) => {
    const query = knex(USER_TABLE).where({ id }).where("privileges", 2);
    const result = await query;
    return result;
}

// Admins can change a user's status
const changeStatus = async (email, privileges) => {
    const query = knex(USER_TABLE).where({ email }).whereNot("privileges", 2).update({ privileges });
    const result = await query;
    return result;
}

module.exports = {
    findUserByEmail,
    findUserByID,
    changeStatus
};