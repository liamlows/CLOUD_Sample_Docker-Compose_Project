const jwt = require('jsonwebtoken');
const User = require('../models/user');


const accessTokenSecret = 'rateababy';

const authenticateUser = async (username, password) => {
    const user = await User.authenticateUser(username, password);
    if (user === null) {
        return user;
    }
    const users = await User.findUserByEmail(username);
    console.log('User', users);
    const accessToken = jwt.sign({ ...users[0]}, accessTokenSecret);

    return accessToken;
    
}

module.exports = {
    authenticateUser
};