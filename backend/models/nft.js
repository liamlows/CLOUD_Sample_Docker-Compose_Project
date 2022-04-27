const knex = require('../database/knex');
const { getConnection } = require('../db');

const NFT_TABLE = 'nft'


const fetchNFT = async () => {

    const query = knex(NFT_TABLE); 
    const result = await query; 

    return result;
}

const createNFT = async (name, image_url, price, description, creator_id, 
    seller_id, owner_id, for_sale) => {

    const query = knex(NFT_TABLE).insert({ name, image_url, price, description, 
        creator_id, seller_id, owner_id, for_sale});
    const result = await query;

    return result;
}

const updateName = async (id, name) => {
    const query = knex(NFT_TABLE).update({ name: name} ).where({ id });
    const result = await query;

    return result;
}

const updatePrice = async (id, price) => {
    const query = knex(NFT_TABLE).update({price: price} ).where({ id });
    const result = await query;

    return result;
}

const updateDescription = async (id, description) => {
    const query = knex(NFT_TABLE).update({ description: description } ).where({ id });
    const result = await query;

    return result;
}

const updateImageUrl = async (id, image_url) => {
    const query = knex(NFT_TABLE).update({image_url: image_url} ).where({ id });
    const result = await query;

    return result;
}

const updateCreatorId = async (id, creator_id) => {
    const query = knex(NFT_TABLE).update({creator_id: creator_id} ).where({ id });
    const result = await query;

    return result;
}

const updateSellerId = async (id, seller_id) => {
    const query = knex(NFT_TABLE).update({ seller_id: seller_id } ).where({ id });
    const result = await query;

    return result;
}

const updateOwnerId = async (id, owner_id) => {
    const query = knex(NFT_TABLE).update({ owner_id: owner_id} ).where({ id });
    const result = await query;

    return result;
}

const updateForSale = async (id, for_sale) => {
    const query = knex(NFT_TABLE).update({for_sale: for_sale} ).where({ id });
    const result = await query;

return result;
}

const getNFT = async (id) => {
    const query = knex(NFT_TABLE).where({ id });
    // (NFT_TABLE).where({ name })
    const result = await query;

    return result;
}

const getNFTCost = async (id) => {
    const query = knex(NFT_TABLE).select('price').where({ id });
    // (NFT_TABLE).where({ name })
    const result = await query;
    return result;
}

const getNFTSeller = async (id) => {
    const query = knex(NFT_TABLE).select('seller_id').where({ id });
    const result = await query;
    return result;
}

const deleteNFT = async (id) => {
    const query = knex(NFT_TABLE).where({ id }).del();
    // (NFT_TABLE).where({ name })
    const result = await query;

    return result;
}

const getAllByPrice = async (min, max, how) => {
    const query = knex(NFT_TABLE).where( 'price', '>', min ).andWhere( 'price', '<', max ).orderBy( 'price' );
    const result = await query;
    return result;
}

const userLeaderboard = async () => {
    const query = knex.raw('SELECT user.*, SUM(price) AS val FROM nft JOIN user ON nft.owner_id = user.id WHERE owner_id NOT IN (SELECT id FROM user WHERE privileges < 1) GROUP BY owner_id ORDER BY val DESC;');
    const result = await query;
    return result;
}

const nftLeaderboard= async () => {
    const query = knex.raw('SELECT *, user.* FROM nft JOIN user ON nft.owner_id = user.id WHERE owner_id NOT IN (SELECT id FROM user WHERE privileges < 1) AND for_sale = 1 ORDER BY price DESC LIMIT 10;');
    const result = await query;
    console.log(result);
    return result;
}

const searchByTerm = async (term) => {
    const searchTerm = '%'+term+'%'
    const query = knex(NFT_TABLE).select('*').whereLike( 'description', searchTerm );

    const result = await query;
    return result;
}

const getNFTbyCreatorId = async (creator_id) => {
    const query = knex(NFT_TABLE).where({ creator_id }); 
    const result = await query;

    return result;
} 

module.exports = {
    createNFT, 
    getNFT,
    fetchNFT,
    deleteNFT,
    updateName,
    updatePrice,
    updateDescription,
    updateImageUrl,
    updateCreatorId,
    updateSellerId,
    updateOwnerId,
    updateForSale,
    getNFTCost,
    getNFTSeller,
    getAllByPrice,
    searchByTerm,
    userLeaderboard,
    nftLeaderboard,
    getNFTbyCreatorId
}
