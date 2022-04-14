const knex = require('backend/knexfile.js')

const NFT_TABLE = 'nft'

const createNFT = async (name, image_url, price, description) => {

    const query = knex(NFT_TABLE).insert({ name, image_url, price, description });
    const result = await query;

    return result;
}

module.exports = {
    createNFT
}

