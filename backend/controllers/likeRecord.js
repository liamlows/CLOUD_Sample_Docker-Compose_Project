const Like = require('../models/likeRecord');


const likeNFT = async(like, id) => {
    const result = await Like.createLikeRecord(like, id)
    return result;
}

const getLikeRecord = async(like, id) => {
    const valid = NFT.getOwnerId(like);
    if(valid[0] === id){
        const result = await Like.getLikeRecord(like)
        return result;
    }
    throw new Error("Cannot view likes.");
}

const getLikeNum = async(like, id) => {
    const result = await Like.getLikeCount(like)
    return result;
}

module.exports = {
    likeNFT,
    getLikeRecord,
    getLikeNum
};