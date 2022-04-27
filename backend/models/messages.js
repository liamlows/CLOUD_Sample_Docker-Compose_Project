const knex = require('../database/knex')

const MESSAGES_TABLE = 'messages'

const createMessage = async (message, send_id, recieve_id) => { 
    const query = knex(MESSAGES_TABLE).insert({ message, send_id, recieve_id});
    const result = await query;
    return result;
}

const getMessage = async (send_id) => {
    const query = knex(MESSAGES_TABLE).where({ send_id });
    const result = await query; 
    return result;
}

const fetchMessage = async () => {
    const query = knex(MESSAGES_TABLE); 
    const result = await query; 
    return result;
}

const deleteMessage = async (id) => {
    const query = knex(MESSAGES_TABLE).where({ id }).del();
    const result = await query; 
    return result;
}

module.exports = { 
    createMessage,
    getMessage,
    fetchMessage,
    deleteMessage
}