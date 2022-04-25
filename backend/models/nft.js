const knex = require('../database/knex')

const NFT_TABLE = 'nft'


const fetchNFT = async () => {

    const query = knex(NFT_TABLE); 
    const result = await query; 

    return result;
}

const createNFT = async (name, image_url, price, description) => {

    const query = knex(NFT_TABLE).insert({ name, image_url, price, description });
    const result = await query;

    return result;
}

const update = async (id, name, price, description) => {
    const query = knex(NFT_TABLE).update({ name: name, price: price, description: description} ).where({ id });
    const result = await query;

    return result;
}

const getNFT = async (id) => {
    const query = knex(NFT_TABLE).where({ id });
    // (NFT_TABLE).where({ name })
    const result = await query;

    return result;
}

const deleteNFT = async (id) => {
    const query = knex(NFT_TABLE).where({ id }).del();
    // (NFT_TABLE).where({ name })
    const result = await query;

    return result;
}

module.exports = {
    createNFT,
    update,
    getNFT,
    fetchNFT,
    deleteNFT
}

