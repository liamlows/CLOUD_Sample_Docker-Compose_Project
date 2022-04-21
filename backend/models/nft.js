const knex = require('../database/knex')

const NFT_TABLE = 'nft'

const createNFT = async (name, image_url, price, description) => {

    const query = knex(NFT_TABLE).insert({ name, image_url, price, description });
    const result = await query;

    return result;
}

const getNFT = async (name) => {
    const query = knex.select('image_url').from(NFT_TABLE).where({ name })
    // (NFT_TABLE).where({ name })
    const result = await query;

    return result;
}

module.exports = {
    createNFT,
    getNFT
}

