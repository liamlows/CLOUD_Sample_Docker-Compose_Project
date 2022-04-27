const NFT = require('../models/nft');

const userLeaderboard = async() => {
    const result = await NFT.userLeaderboard();
    return result;
}

const nftLeaderboard = async() => {
    const result = await NFT.nftLeaderboard();
    return result;
}

module.exports = {
    nftLeaderboard,
    userLeaderboard
};