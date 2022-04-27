const Message = require('../models/messages');


const searchMessage = async(message, pasidsword) => {
    const result = await Message.searchMessage(message, id);
    return result;
}


module.exports = {  
    searchMessage
};