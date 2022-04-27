const User = require('../models/users');
const NFT = require('../models/nft');
const Purchase = require('../models/purchase');


// Create new user if email and password are provided
const createUser = async (username, name, email, password, privileges, photo) => {
    if(!email){
        console.error("No email provided");
    }
    if(!password){
        console.error("No password provided");     
    }

    const exists = await User.findUserByEmail(email);
    const exists1 = await User.findUserByUsername(username);

    if(exists.length != 0){
        console.error("Email already in use.");
    } else if(exists1.length != 0){
        console.error("Username already in use.");
    } else {
        const user = await User.createNewUser(username, name, email, password, privileges, photo);
        return user;
    }
    throw new Error("Could not create user.");
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

const purchaseNFT = async(id, nftID) => {

    const valid = await User.validatePurchase(id);
    // Check for valid payment
    if(valid === 0){
        console.log("No payment information provided.");
        throw new Error("No payment information provided.");
    }

    const valid1 = await NFT.getForSale(nftID);
    if(valid[0] === 0){
        console.log("NFT not for sale.");
        throw new Error("NFT not for sale.");
    }
    const balance = User.balance(id);
    const cost = NFT.getNFTCost(nftID);
    // Check for sufficient funds
    if(balance < cost){
        console.log("Insufficient funds.");
        throw new Error("Insufficient funds.");
    }

    // Transfer funds from buyer to seller
    const transfer1 = await User.adjustFunds(id, cost, 0);
    const seller = await NFT.getNFTSeller(nftID);
    const transfer2 = await User.adjustFunds(seller, cost, 1);
    // Transfer ownership
    const transfer3 = await NFT.updateSellerID(nftID, id);
    const transfer4 = await NFT.updateOwnerID(nftID, id);
    const sale = await NFT.updateForSale(nftID, 0);

    return result;
}

const paymentInfo = async(id, cardType, cardNum, name, cvv, exp) => {
    console.log(id, cardType, cardNum, name, cvv, exp);
    const result = await User.addInfo(id, cardType, cardNum, name, cvv, exp);
    return result;
}

const transfer = async(id, amount) => {
    const result = await User.validatePurchase(id);
    if(result === 0){
        throw new Error("No payment info found.");
    }
    const result1 = await User.transferFunds(id, amount);
    return result1;
}

const updateInfo = async(id, email, username, password, name, photo) => {
    if(email) {
        const result = await User.updateEmail(id, email);
    }
    if(username){
        const result = await User.updateUsername(id, username);
    }
    if(password){
        const result = await User.updatePassword(id, password);
    }
    if(name){
        const result = await User.updateName(id, name);
    }
    if(photo){
        const result = await User.updatePhoto(id, photo);
    }
    const rez = await User.findUserByID(id);
    return rez;
}

const userSearch = async(username, id, email) => {
    const result = await User.findUser(username, id, email);
    return result;
}

const hideNFT = async(id, nft) => {
    const result = await User.hideNFT(id, nft);
    return result;
}

const deleteComment = async (id, nftid, commentID) => {
    const valid = NFT.getOwnerId(nftid);
    const valid1 = Comments.getCommenter(commentID);
    if(valid[0] === id || valid1[0] === id){
        const result = await Comments.delComments(commentID);
        return result;
    }
    
    throw new Error("Cannot delete comment.");
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
    transfer,
    updateInfo,
    userSearch,
    hideNFT
};