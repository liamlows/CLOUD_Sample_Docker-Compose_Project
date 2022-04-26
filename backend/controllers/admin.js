const Admin = require('../models/admin');
const User = require('../models/users');

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
            if(name){
                const val = await User.updateName(id, name);
            }
            if(photo){
                const val1 = await User.updatePhoto(id, photo);
            }
        } else {
            return res.sendStatus(404);
        }
        
    } else {
        if(name){
            const val2 = await User.updateName(admin_id, name);
        }
        if(photo){
            const val34 = await User.updatePhoto(admin_id, photo);
        }
    }
    
    return;
}

module.exports = {
    blockUser,
    disableUser,
    promoteUser,
    enableUser
};