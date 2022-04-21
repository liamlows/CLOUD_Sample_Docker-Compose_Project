const knex = require('../database/knex');

const USER_TABLE = 'users';
//create new user account
const createNewUser = async (email, password, type) => {
    //create farmer
    if(type==="farmer"){
        //add farmer to table
        const query = knex('users').insert({ email, password, isFarmer: 1 });
        console.log('Raw query for createFarmer:', query.toString());
        const result = await query;
        return result;
    }
    //create customer
    else{
        //add customer to table
        const query = knex('users').insert({ email, password, isFarmer: 0 });
        console.log('Raw query for createCustomer:', query.toString());
        const result = await query;
        return result;
    }
};
//find user
const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email });
    const result = await query;
    return result;
}
//sign in
const authenticateUser = async (email, password) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return null;
    }
    const user = users[0];
    if (user.password===password) {
        delete user.password;
        return user;
    }
    return null;
}
//update password
const updatePassword = async (email, newPassword) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    //change user password
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return null;
    }
    const query1 = await knex(USER_TABLE).where({email}).update({password: newPassword});
    return null;
}
//delete account
const deleteAccount = async (email) => {
    console.log('email: ',email);
    const query1 = await knex(USER_TABLE).where({email}).del();
    console.log('Raw query for deleteAccount:', query1.toString());
    return null;
}

module.exports = {
    createNewUser,
    findUserByEmail,
    authenticateUser,
    updatePassword,
    deleteAccount
};