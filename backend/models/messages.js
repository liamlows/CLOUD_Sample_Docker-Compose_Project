const knex = require('../database/knex')

const MESSAGES_TABLE = 'messages'

const createMessage = async (message, send_id, recieve_id) => { 
    const query = knex(MESSAGES_TABLE).insert({ message, send_id, recieve_id});
    const result = await query;
    return result;
}

const getMessage = async (send_id) => {
    const query = knex(MESSAGES_TABLE).where({ send_id }) 
    const result = await query;
    console.log("Query result", result);
    return result;
}

module.exports = { 
    createMessage,
    getMessage
}