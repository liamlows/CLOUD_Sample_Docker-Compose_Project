const User = require('../models/users');


// Create new user if email and password are provided
const createUser = async (username, name, email, password, privileges, photo) => {
    if(!email){
        res.status(400).json("No email provided");
    }
    if(!password){
        res.status(400).json("No password provided");     
    }
    const user = await User.createNewUser(username, name, email, password, privileges, photo);

    return user;
}

// Authenticate user
const authenticateUser = async(email, password) => {
    const result = await User.authenticateUser(email, password);
    return result;
}

// Finds user by email
const findUserByEmail = async(email) => {
    const result = await User.findUserByEmail(email);
    return result;
};


const deleteUserById = async (id) => {
    const result = await User.deleteUser(id);  
    return result;
}

const updateName = async (id, name) => { 
    const result = await User.updateName(id, name);  
    return result; 
}

const updatePhoto = async (id, photo) => { 
    const result = await User.updatePhoto(id, photo);  
    return result; 
} 

const balance = async(id) => {
    const result = await User.getBalance(id);
    return result;
}

const purchaseNFT = async(id) => {
    const result = await User.validatePurchase(id);
    return result;
}

const paymentInfo = async(id, cardType, cardNum, name, cvv, exp) => {
    console.log(id, cardType, cardNum, name, cvv, exp);
    const result = await User.addInfo(id, cardType, cardNum, name, cvv, exp);
    return result;
}

const transfer = async(id, amount) => {
    const result = await User.transferFunds(id, amount);
    return result;
}


module.exports = {
    createUser,
    authenticateUser,
    findUserByEmail,
    deleteUserById,
    updateName,
    updatePhoto,
    balance,
    purchaseNFT,
    paymentInfo,
    transfer
};