const Message = require('../models/messages');


const searchMessage = async(message, id) => {
    const result = await Message.searchMessage(message, id);
    return result;
}


module.exports = {  
    searchMessage
};