const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Admin = require('../models/admin');

const accessTokenSecret = process.env.TOKEN;

const authenticateAdmin = async (email, password) => {
    const user = await User.authenticateUser(email, password);
    if (user === null) {
        return user;
    }
    const admins = await Admin.findUserByEmail(email);
    console.log('Admins', admins);
    const accessToken = jwt.sign({ ...admins[0], claims: ['Admin'] }, accessTokenSecret);

    return accessToken;
    
}

module.exports = {
    authenticateAdmin
};