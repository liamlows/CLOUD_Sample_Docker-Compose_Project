const knex = require('../database/knex');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';
//create new user account
const createNewUser = async (email, password, type) => {
    //add user to table
    const query = knex(USER_TABLE).insert({ email, password });
    console.log('Raw query for createNewUser:', query.toString());
    const result = await query;
    //create farmer
    if(type==="farmer"){
        const farmer = await createFarmer(email,password);
    }
    //create customer
    else{
        const customer = await createCustomer(email,password);
    }
    return result;
};
//create new farmer
const createFarmer = async (email, password) => {
    //add farmer to table
    const query = knex('farmer').insert({ email, password });
    console.log('Raw query for createFarmer:', query.toString());
    const result = await query;
    return result;
};
//create new customer
const createCustomer = async (email, password, type) => {
    //add customer to table
    const query = knex('customer').insert({ email, password });
    console.log('Raw query for createCustomer:', query.toString());
    const result = await query;
    return result;
};
//find farmer
const findFarmerByEmail = async (email) => {
    const query = knex('farmer').where({ email });
    const result = await query;
    return result;
}
//find customer
const findCustomerByEmail = async (email) => {
    const query = knex('customer').where({ email });
    const result = await query;
    return result;
}
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
    //check if user is farmer
    const farmers = await findFarmerByEmail(email);
    console.log('Farmers ', farmers);
    //if user is farmer
    if(farmers.length !== 0){
        const query2 = await knex('farmer').where({email}).update({password: newPassword});
        return null;
    }
    //check if user is customer
    const customers = await findCustomerByEmail(email);
    console.log('Customers ', customers);
    //if user is customers
    if(customers.length !== 0){
        const query2 = await knex('customer').where({email}).update({password: newPassword});
        return null;
    }
}
//delete account
const deleteAccount = async (email) => {
    console.log('email: ',email);
    const query1 = await knex(USER_TABLE).where({email}).del();
    console.log('Raw query for deleteAccount:', query1.toString());
    //check if user is farmer
    const farmers = await findFarmerByEmail(email);
    console.log('Farmers ', farmers);
    //if user is farmer
    if(farmers.length !== 0){
        const query2 = await knex('farmer').where({email}).del();
        return null;
    }
    //check if user is customer
    const customers = await findCustomerByEmail(email);
    console.log('Customers ', customers);
    //if user is customers
    if(customers.length !== 0){
        const query2 = await knex('customer').where({email}).del();
        return null;
    }
}

module.exports = {
    createNewUser,
    createFarmer,
    createCustomer,
    findFarmerByEmail,
    findCustomerByEmail,
    findUserByEmail,
    authenticateUser,
    updatePassword,
    deleteAccount
};