const Admin = require('../models/admin');
const User = require('./users');
const Comments = require('../models/comments')

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

const updateInfo = async(admin_id, id, name, photo) => {
    if(id){
        const result = await Admin.findUserByID(id);
        if(result.length === 0){
            const val = User.updateInfo(id, name, photo);
            return val;
        } else {
            console.log(result);
            return res.sendStatus(403);
        }
        
    } else {
        const val = User.updateInfo(admin_id, name, photo);
        return val;
    }
}

const deleteComment = async (id) => {
    const result = await Comments.delComments(id);
    return result;
}

module.exports = {
    blockUser,
    disableUser,
    promoteUser,
    enableUser,
    updateInfo,
    deleteComment
};