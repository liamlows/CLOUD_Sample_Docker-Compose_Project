const knex = require('../knex');

const USER_TABLE = 'user';

const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email }).where("privileges", 2);
    const result = await query;
    return result;
}

module.exports = {
    findUserByEmail
};