const Admin = require('../models/admin');

// Change user's status to blocked
const blockUser = async (email) => {
    if(!email){
        res.status(400).json("No email provided");
    }

    const user = await Admin.changeStatus(email, 0);

    return user;
}

// Change user's status to disabled
const disableUser = async (email) => {
    if(!email){
        res.status(400).json("No email provided");
    }

    const user = await Admin.changeStatus(email, -1);

    return user;
}

// Change user's status to re-enabled
const enableUser = async (email) => {
    if(!email){
        res.status(400).json("No email provided");
    }

    const user = await Admin.changeStatus(email, 1);

    return user;
}

// Change user's status to admin
const promoteUser = async (email) => {
    if(!email){
        res.status(400).json("No email provided");
    }

    const user = await Admin.changeStatus(email, 2);

    return user;
}

module.exports = {
    blockUser,
    disableUser,
    promoteUser,
    enableUser
};