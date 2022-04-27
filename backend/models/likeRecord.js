const knex = require('../database/knex');
const { getConnection } = require('../db');

const LIKERECORD_TABLE = 'likeRecord';

const createLikeRecord = async (liked_nft, liked_user_id) => { 
    const query = knex(LIKERECORD_TABLE).insert({ liked_nft, liked_user_id });
    const result = await query;
    return result;
}

const getLikeRecord = async (liked_nft) => { 
    const query = knex(MESSAGES_TABLE).where({ liked_nft }).count();
    const result = await query; 
    return result; 
}

module.exports = { 
    createLikeRecord, 
    getLikeRecord,
}