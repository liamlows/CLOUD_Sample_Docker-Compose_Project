const User = require('../models/users');
const Dashboard = require('../models/dashboard');

const createModelsMiddleware = async (req, res, next) => {
    req.models = {
        user: User,
        dash: Dashboard
    }
    next();
}

module.exports = {
    createModelsMiddleware,
}