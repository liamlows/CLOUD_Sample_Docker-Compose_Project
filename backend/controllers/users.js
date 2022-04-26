const User = require('../models/users');
// const NFT = require('..models/nft');


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

// const purchaseNFT = async(id, nftID) => {

//     const valid = await User.validatePurchase(id);
//     // Check for valid payment
//     if(valid === 0){
//         console.log("No payment information provided.");
//         return res.sendStatus(404);
//     }
//     const balance = User.balance(id);
//     const cost = NFT.getNFTCost(nftID);
//     // Check for sufficient funds
//     if(balance < cost){
//         console.log("Insufficient funds.");
//         return res.sendStatus(403);
//     }

//     // Transfer funds from buyer to seller
//     const transfer1 = await User.adjustFunds(id, cost, 0);
//     const seller = await NFT.getNFTSeller(nftID);
//     const transfer2 = await User.adjustFunds(seller, cost, 1);
//     // Transfer ownership
//     const transfer3 = await NFT.updateSellerID(nftID, id);
//     const transfer4 = await NFT.updateOwnerID(nftID, id);
//     const sale = await NFT.updateForSale(nftID, 0);

//     return result;
// }

const paymentInfo = async(id, cardType, cardNum, name, cvv, exp) => {
    console.log(id, cardType, cardNum, name, cvv, exp);
    const result = await User.addInfo(id, cardType, cardNum, name, cvv, exp);
    return result;
}

const transfer = async(id, amount) => {
    const result = await User.validatePurchase(id);
    if(result === 0){
        return res.sendStatus(404);
    }
    const result1 = await User.transferFunds(id, amount);
    return result1;
}

const updateInfo = async(id, name, photo) => {
    if(name){
        const result = await User.updateName(id, name);
    }
    if(photo){
        const result = await User.updatePhoto(id, photo);
    }
    const rez = await User.findUserByID(id);
    return rez;
}

module.exports = {
    createUser,
    authenticateUser,
    findUserByEmail,
    deleteUserById,
    updateName,
    updatePhoto,
    balance,
    // purchaseNFT,
    paymentInfo,
    transfer,
    updateInfo
};