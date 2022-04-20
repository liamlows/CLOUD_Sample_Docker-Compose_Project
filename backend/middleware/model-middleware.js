const User = require('../models/users');

const createModelsMiddleware = async (req, res, next) => {
    req.models = {
        user: User,
    }
    next();
}

module.exports = {
    createModelsMiddleware,
}