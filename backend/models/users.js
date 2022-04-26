const knex = require('../database/knex');

const USER_TABLE = 'users';
//create new user account
const createNewUser = async (first_name, last_name, email, password, isFarmer) => {
    //create farmer
    if(isFarmer==="1"){
        //add farmer to table
        const query = knex('users').insert({ first_name, last_name, email, password, isFarmer: 1 });
        console.log('Raw query for createFarmer:', query.toString());
        const result = await query;
        const users = await findUserByEmail(email);
        return users[0];
    }
    //create customer
    else{
        //add customer to table
        const query = knex('users').insert({ first_name, last_name, email, password, isFarmer: 0 });
        console.log('Raw query for createCustomer:', query.toString());
        const users = await findUserByEmail(email);
        return users[0];
    }
};
//find user
const findUserByID = async (user_id) => {
    const query = knex(USER_TABLE).where({ user_id });
    const result = await query;
    return result;
}
//find user by email
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
        console.error(`No users matched the id: ${email}`);
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
const updatePassword = async (user_id, newPassword) => {
    const users = await findUserByID(user_id);
    console.log('Results of users query', users);
    //change user password
    if (users.length === 0) {
        console.error(`No users matched the ID: ${user_id}`);
        return null;
    }
    const query1 = await knex(USER_TABLE).where({user_id}).update({password: newPassword});
    return null;
}
//delete account
const deleteAccount = async (user_id) => {
    const query1 = await knex(USER_TABLE).where({user_id}).del();
    console.log('Raw query for deleteAccount:', query1.toString());
    return null;
}

module.exports = {
    createNewUser,
    findUserByID,
    findUserByEmail,
    authenticateUser,
    updatePassword,
    deleteAccount
};