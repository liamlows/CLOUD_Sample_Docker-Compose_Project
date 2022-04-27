const NFT = require('../models/nft');

const modifyNFT = async(id, name, image_url, price, description, creator_id, seller_id, owner_id, for_sale) => {
    const result = await NFT.updateNFT(id, name, image_url, price, description, creator_id, seller_id, owner_id, for_sale);
    return result;
}

module.exports = {
    modifyNFT
};
