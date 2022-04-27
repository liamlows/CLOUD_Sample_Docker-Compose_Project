const knex = require('../knex');

const COMMENT_TABLE = 'commentRecord';
const USER_TABLE = 'user';

const postComment = async (commenterID, nftID, comment) => { 
    const query = knex(COMMENT_TABLE).insert({ commenterID, nftID, comment });
    const result = await query;
    return result;
}

const getComments = async (nftID) => { 
    const query = knex('commentRecord').where({ nftID }).join('user', 'commentRecord.commenterID', '=', 'user.id');
    const result = await query; 
    return result; 
}

const getNumComments = async (nftID) => { 
    const query = knex(COMMENT_TABLE).where({ nftID }).count;
    const result = await query; 
    return result; 
}

const delComments = async (infoID) => { 
    const query = knex(COMMENT_TABLE).where({ infoID }).del();
    const result = await query; 
    return result; 
}

const getCommenter = async (infoID) => { 
    const query = knex(COMMENT_TABLE).select('commenterID').where({ infoID });
    const result = await query; 
    return result; 
}

module.exports = { 
    postComment,
    getComments,
    getNumComments,
    delComments,
    getCommenter
}