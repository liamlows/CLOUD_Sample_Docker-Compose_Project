const jwt = require('jsonwebtoken');
const knex = require('../knex');
const bcrypt = require('bcryptjs');

const USER_TABLE = 'user';
const PAYMENT_TABLE = 'cardInfo';
const NFT_TABLE = 'nft';

const accessTokenSecret =  process.env.TOKEN;

// Creates a new system user with a secure password
const createNewUser = async (username, name, email, password, privileges, photo) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);

    const exists = await findUserByEmail(email);
    const exists1 = await findUserByUsername(username);

    if(exists.length === 0 && exists1.length === 0){
        // Inserts into user table
        const query = knex(USER_TABLE).insert({ username, name, email, password: hashedPassword, privileges, photo });
        const result = await query;
        return result;
    } else {
        console.log("Username or email already exists.");
        return res.sendStatus(401);
    }

   
};

// Locates a user record by email
const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email });
    const result = await query;
    return result;
}

// Locates a user record by email
const findUserByID = async (id) => {
    const query = knex(USER_TABLE).where({ id });
    const result = await query;
    return result;
}

const findUserByUsername = async (username) => {
    const query = knex(USER_TABLE).whereRaw('username LIKE "%' + username + '%"');
    const result = await query;
    return result;
}

const findUser = async (username, id, email) => {

    const query = knex(USER_TABLE)
    if(username){
        query.whereRaw('username LIKE "%' + username + '%"');
    }
    if(id){
        query.where({ id });
    }
    if(email){
        query.where({ email });
    }

    const result = await query;
    return result;
}

const getAdmin = async (email) => {
    const query = knex(USER_TABLE).where({ email }).whereRaw('privileges = 2');
    const result = await query;
    return result;
}

const getBlocked = async (email) => {
    const query = knex(USER_TABLE).where({ email }).whereRaw('privileges = 0');
    const result = await query;
    return result;
}

const getDisabled = async (email) => {
    const query = knex(USER_TABLE).where({ email }).whereRaw('privileges = -1');
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
        const disabled = await getDisabled(email);
        if(disabled.length != 0){
            console.error(`Account is disabled.`);
            throw EvalError;
        }
        const admin = await getAdmin(email);
        const blocked = await getBlocked(email);
        // If not admin and not blocked
        if(admin.length === 0 && blocked.length === 0){
            return jwt.sign({ ...user, claims: ['user', 'unblocked'] }, accessTokenSecret);
        // If admin and not blocked
        } else if (admin.length != 0 && blocked.length === 0) {
            return jwt.sign({ ...user, claims: ['admin', 'user', 'unblocked'] }, accessTokenSecret);
        // If not admin and blocked
        } else if(admin.length === 0 && blocked.length != 0){
            return jwt.sign({ ...user, claims: ['user'] }, accessTokenSecret);
        // If admin and blocked
        } else {
            return jwt.sign({ ...user, claims: ['admin', 'user'] }, accessTokenSecret);
        }
    // If the password is invalid, logs a relevant error
    } else {
        console.error(`Invalid password.`);
        throw EvalError;
    }
}

const deleteUser = async (id) => {
    const query = knex(USER_TABLE).where({ id }).del();
    const result = await query;
    return result;
}

const updateEmail = async(id, email) => {
    const query = knex(USER_TABLE).update({eamil: email} ).where({ id });
    const result = await query;
    return result;
}

const updateUsername = async(id, username) => {
    const query = knex(USER_TABLE).update({username: username} ).where({ id });
    const result = await query;
    return result;
}
const updatePassword = async(id, password) => {
    const query = knex(USER_TABLE).update({password: password} ).where({ id });
    const result = await query;
    return result;
}

const updateName = async (id, name) => {
    const query = knex(USER_TABLE).update({name: name} ).where({ id });
    const result = await query;
    return result;
} 

const updatePhoto = async (id, photo) => {
    const query = knex(USER_TABLE).update({photo: photo} ).where({ id });
    const result = await query;
    return result;
} 

const getBalance = async (id) => {
    const query = knex(USER_TABLE).select('balance').where({ id });
    const result = await query;
    return result;
} 

const validatePurchase = async (userID) => {
    const query = knex(PAYMENT_TABLE).where({ userID });
    const result = await query;
    return result;
}

const addInfo = async(userID, cardType, cardNum, name, cvv, exp) => {
    console.log(userID, cardType, cardNum, name, cvv, exp);
    const query = knex(PAYMENT_TABLE).insert([{ userID, cardType, cardNum, name, cvv, exp }]);
    const result = await query;
    return result;
}

const transferFunds = async (id, funds) => {
    const query = knex(USER_TABLE).where({ id }).update('balance', funds);
    const result = await query;
    return result;
}

const adjustFunds = async (id, funds, op) => {
    const curr = await getBalance(id);
    if(op === 0){
        const updated = curr - funds;
    } else {
        const updated = curr + funds;
    }
    const query = knex(USER_TABLE).where({ id }).update('balance', updated);
    const result = await query;
    return result;
}

const hideNFT = async (userID, id) => {
    const query = knex(NFT_TABLE).where({ userID }).where({ id }).update('visible', 0);
    const result = await query;
    return result;
}


module.exports = {
    createNewUser,
    findUserByEmail,
    findUserByID,
    authenticateUser,
    deleteUser, 
    updateName,
    updatePhoto,
    getBalance,
    validatePurchase,
    addInfo,
    transferFunds,
    adjustFunds,
    findUserByUsername,
    findUser,
    updateEmail,
    updateUsername,
    updatePassword
};