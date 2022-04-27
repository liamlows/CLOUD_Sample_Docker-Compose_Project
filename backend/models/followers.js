const knex = require('../knex');

const FOLLOWER_TABLE = 'follower';

const getUserFollower = async (id) => {
    const query = knex(FOLLOWER_TABLE).where('userID', id);
    const result = await query;
    return result;
}

const getUserFollowing = async (id) => {
    const query = knex(FOLLOWER_TABLE).where('followerID', id);
    const result = await query;
    return result;
}

const followUser = async (userID, followerID) => {
    const query = knex(FOLLOWER_TABLE).insert({userID, followerID});
    const result = await query;
    return result;
}

const unfollowUser = async (userID, followerID) => {
    const query = knex(FOLLOWER_TABLE).where({userID, followerID}).del();
    const result = await query;
    return result;
}

module.exports = {
    getUserFollower,
    getUserFollowing,
    followUser,
    unfollowUser
}