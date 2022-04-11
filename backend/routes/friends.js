const express = require('express');
const router = express.Router();
const pool = require('../db');
const util = require('../util');


router.use(util.isUserAuthenticated);

async function getFriendsList(accountId){
    let rows, _;
    [rows, _] = await pool.execute(
        'SELECT * FROM `friendships` WHERE `friend_a` = ? OR `friend_b` = ?',
        [accountId, accountId]);

    return rows;
}


async function getFriendRequests(accountId) {
    let incoming, outgoing, _;

    [incoming, _] = await pool.execute(
        'SELECT * FROM friend_requests WHERE `requested_id` = ?', [accountId]
    );

    [outgoing, _] = await pool.execute(
        'SELECT * FROM friend_requests WHERE `requester_id` = ?', [accountId]
    );

    return {
        incoming: incoming,
        outgoing: outgoing
    };
}

async function findRequest(fromId, toId) {
    let [rows, fields] = await pool.execute(
        'SELECT * FROM `friend_requests` WHERE `requester_id` = ? AND `requested_id` = ?', [fromId, toId]);

    console.log(rows);

    if(rows.length === 0){
        return undefined;
    }
    else {
        return rows[0];
    }
}


/*
GET /api/friends/

Returns your friends list. Requires being logged in.
*/
router.get("/", async (req, res, next) => {
    let friends;
    try {
      friends = await getFriendsList(req.session.accountId);
    } catch (error) {
        return next(error);
    }
    res.status(200).json(friends);
});

/*
GET /api/friends/requests/

Returns both incoming and outgoing friend requests.  Requires being logged in.
 */
router.get("/requests/", async (req, res, next) => {
    let requests;
    try {
        requests = await getFriendRequests(req.session.accountId);
    } catch (error) {
        return next(error);
    }
    res.status(200).json(requests);
});

/*
POST /api/friends/requests/

Creates a new friend request if possible. Requires being logged in.
*/
router.post("/requests/", async (req, res, next) => {
    let targetId = req.body.targetId;
    if(targetId === undefined) {
        res.status(400).send();
        return;
    }

    // Ensure we cannot friend ourselves.
    if(targetId === req.session.accountId){
        res.status(400).send();
        return;
    }

    // Check if we already have an outgoing request.
    let request;

    try {
        request = await findRequest(req.session.accountId, targetId);

        if(request){
            res.status(200).send({success: 0, error: "You already have an outgoing request to this user."})
            return;
        }

    } catch(error) { return next(error); }

    // Check if we already have an incoming request.
    try {
        request = await findRequest(targetId, req.session.accountId);

        if(request){
            res.status(200).send({success: 0, error: "You already have an incoming request to this user."})
            return;
        }

    } catch(error) { return next(error); }


    // Insert the new request into the database.
    try {
        await pool.execute('INSERT INTO `friend_requests`(requester_id, requested_id) VALUES (?, ?)',
            [req.session.accountId, targetId]);
    } catch(error) { return next(error); }

    res.status(200).send({
        success: 1, error: ""
    })
});

/*
PUT /api/friends/requests/:otherAccountId

Accepts or denies the friend request, where otherAccountId is the other user that sent the request.
Requires being logged in.

*/
router.put("/requests/:otherId", async (req, res, next) => {
    let otherId = req.params.otherId;
    let accepted = req.body.status;
    if(accepted !== 0 && accepted !== 1) {
        res.status(400).send();
        return next();
    }

    // Check if the friend request has already been accepted or denied.
    try {
        let friend_request = await findRequest(otherId, req.session.accountId);

        if(friend_request.status !== -1){
            res.status(403).send();
            return next();
        }

    } catch (error) {
        return next(error);
    }


    try {
        // Update the request.
        await pool.execute(
            'UPDATE `friend_requests` SET `status` = ? WHERE `requester_id` = ? AND `requested_id` = ?',
            [accepted, otherId, req.session.accountId]);

        if(accepted) {
            // Add them to the friends list.

            let friend_a, friend_b; // Ensure that friend_a < friend_b

            if(req.session.accountId < otherId) {
                friend_a = req.session.accountId;
                friend_b = otherId;
            }
            else {
                friend_a = otherId;
                friend_b = req.session.accountId;
            }

            await pool.execute(
                'INSERT INTO `friendships`(friend_a, friend_b) VALUES (?, ?)', [friend_a, friend_b]
            );

        }

    } catch(error) {
        return next(error);
    }

    return res.status(200).send();
});

module.exports = router;