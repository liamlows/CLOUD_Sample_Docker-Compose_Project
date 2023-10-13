const com = require('../models/comments');

const postComment = async(id, nftid, comment) => {
    const result = await com.postComment(id, nftid, comment);
    return result;
}

const getComments = async(nftid) => {
    const result = await com.getComments(nftid);
    return result;
}

const getAmntComments = async(nftid) => {
    const result = await com.getNumComments(nftid);
    return result;
}

module.exports = {
    postComment,
    getComments,
    getAmntComments
};