const Follower = require('../models/followers');

const getFollowers = async(id) => {
    const result = await Follower.getUserFollower(id);
    return result;
}

const getFollowerCount = async(id) => {
    const result = await Follower.getUserFollowerCount(id);
    return result;
}

const getFollowing = async(id) => {
    const result = await Follower.getUserFollowing(id);
    return result;
}

const getFollowingCount = async(id) => {
    const result = await Follower.getUserFollowingCount(id);
    return result;
}

const follow = async(uid, fid) => {
    const result = await Follower.followUser(uid, fid);
    return result;
}

const unfollow = async(uid, fid) => {
    const result = await Follower.unfollowUser(uid, fid);
    return result;
}

module.exports = {
    getFollowers,
    getFollowerCount,
    getFollowing,
    getFollowingCount,
    follow,
    unfollow
};