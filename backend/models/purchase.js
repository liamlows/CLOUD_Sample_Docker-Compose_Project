const knex = require('../knex');
const PAYMENT_TABLE = 'cardInfo';
const HISTORY = 'transaction_history';

const validatePurchase= async (userID) => {
    const query = knex(PAYMENT_TABLE).where({ userID });
    const result = await query;
    return result;
}

const addInfo = async(userID, cardType, cardNum, name, cvv, exp) => {
    const query = knex(PAYMENT_TABLE).insert([{ userID }, { cardType }, { cardNum }, { name }, { cvv }, { exp }]);
    const result = await query;
    return result;
}

const storeTransaction = async(userID, sellerID, nftID, cost) => {
    const query = knex(PAYMENT_TABLE).insert([{ userID }, { sellerID }, { nftID }, { cost }]);
    const result = await query;
    return result;
}


module.exports = {
    validatePurchase,
    addInfo
}