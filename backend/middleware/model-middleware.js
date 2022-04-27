const NFT = require('../models/nft');
const MESSAGES = require('../models/messages');
const TRANSACTION = require('../models/transaction')
const USER = require('../models/users')

/**
 * This middleware function is meant to be registered BEFORE the route handlers (see index.js)
 * This sets up a connection to the database. We modify the request object by tacking on the
 * models and disconnect function. Any FUTURE middleware / route handler thus has access to
 * those models / disconnect function by virtue of the fact that the request object is the same
 * one through the whole chain
 */
const createModelsMiddleware = async (req, res, next) => {
    console.log('Creating models in middleware');
    req.models = {
        nft: NFT,
        messages: MESSAGES,
        transaction: TRANSACTION
        user: USER
    }
    next();
}

module.exports = {
    createModelsMiddleware,
}