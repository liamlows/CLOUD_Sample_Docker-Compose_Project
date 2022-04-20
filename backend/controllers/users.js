const jwt = require('jsonwebtoken');
const User = require('../models/users');

const accessTokenSecret = 'mysupercoolsecret';

const authenticateUser = async (email, password) => {
    //log into account
    const user = await User.authenticateUser(email, password);
    if (user === null) {
        return user;
    }
    //check if user is farmer
    const farmers = await User.findFarmerByEmail(email);
    console.log('Farmers ', farmers);
    //if user is farmer
    if(farmers.length !== 0){
        const accessToken = jwt.sign({ ...farmers[0], claims: ['farmer'] }, accessTokenSecret);
        return accessToken;
    }
    //check if user is customer
    const customers = await User.findCustomerByEmail(email);
    console.log('Customers ', customers);
    //if user is customer
    if(customers.length !== 0){
        const accessToken = jwt.sign({ ...customers[0], claims: ['customer'] }, accessTokenSecret);
        return accessToken;
    }
}

module.exports = {
    authenticateUser
};