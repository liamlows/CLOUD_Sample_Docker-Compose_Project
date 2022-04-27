const { builtinModules } = require('module');
const knex = require('../database/knex');
const { getConnection } = require('../db');

const TRANSACTION_TABLE = 'transaction'


const createTransaction = async (nft_id, buyer_id, seller_id, amount) => {
    const query = knex(TRANSACTION_TABLE).insert( {nft_id, buyer_id, seller_id, amount} ); 
    const result = await query; 

    return result;
};

const getTransaction1 = async (nft_id) => {
    const query = knex(TRANSACTION_TABLE).where( {nft_id} );
    const result = await query; 

    return result;
};

const getTransaction2 = async (buyer_id) => {
    const query = knex(TRANSACTION_TABLE).where( {buyer_id} );
    const result = await query; 

    return result;
};

const getTransaction3 = async (seller_id) => {
    const query = knex(TRANSACTION_TABLE).where( {seller_id} );
    const result = await query; 

    return result;
};

module.exports = {
    createTransaction,
    getTransaction1,
    getTransaction2,
    getTransaction3,
}