const { WebSocketServer } = require('ws');
const {log} = require("@rama41222/node-logger");
const wss = new WebSocketServer({ clientTracking: false, noServer: true });
const logger = log({ console: true, file: false, label: "websocket_server" });
const pool = require('./db');
const { createClient } = require('redis');

const websockets = (server, sessionParser) => {
    logger.info("Doing ws setup");
    server.on('upgrade', function (request, socket, head) {
        sessionParser(request, {}, () => {
            if (!request.session.accountId) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }

            logger.info("Handling websocket upgrade...");

            wss.handleUpgrade(request, socket, head, function (ws) {
                wss.emit('connection', ws, request);
            });
        });
    });
}


const redisClient = createClient(
    {url: `redis://:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:6379`}
);
redisClient.on('error', (err) => console.log('Redis Client Error', err));

const pubClient = redisClient.duplicate();
const subClient = redisClient.duplicate();

redisClient.connect().then(r => {});
pubClient.connect().then(r => {});
subClient.connect().then(() => {
    subClient.subscribe("online", handleUserOnline).catch(
        () => {}
    );
});

const clientMap = new Map();


const onWSMessage = function(socket, session, message) {
    message = JSON.parse(message);
};

function heartbeat() {
    this.isAlive = true;
}

const onClientConnect = function (ws, request) {
    const accountId = request.session.accountId;

    clientMap.set(accountId, ws);

    redisClient.SADD("onlineUsers", accountId).catch(
        () => {}
    );

    ws.accountId = accountId;
    ws.username = request.session.username;

    pubClient.publish("online", JSON.stringify({accountId: ws.accountId, username: ws.username})).catch(
        () => {}
    );
    ws.on('message', (message) => onWSMessage(ws, request.session, message));

    ws.on('close', function () {
        clientMap.delete(accountId);
        redisClient.SREM("onlineUsers", accountId);
    });

    ws.isAlive = true;
    ws.on('pong', heartbeat);
};

const pingInterval = setInterval(()=> {
    clientMap.forEach((ws, userId) => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}, 3000);


wss.on('connection', onClientConnect);
wss.on('close', function close() {
    clearInterval(pingInterval);
});


async function isUserOnline(accountId) {
    let onlineUsers = await redisClient.SMEMBERS("onlineUsers", accountId);
    return onlineUsers.includes(accountId.toString());
}

async function handleUserOnline(event) {
    let body = JSON.parse(event);

    if(!body.accountId || !body.username)
        return;

    let accountId = body.accountId;
    let username = body.username;

    let q =  "SELECT friend_a, friend_b FROM `friendships` WHERE `friend_a` = ? OR `friend_b` = ?";
    let [friendships, _] = await pool.execute(q,
        [accountId, accountId]);

    let friends = friendships.map((friendship) => {
        if(friendship.friend_a !== accountId){
            return {id: friendship.friend_a}
        }
        else{
            return {id: friendship.friend_b}
        }
    });

    friends.forEach((friend)=> {
        let friendWS = clientMap.get(friend.id);
        if(friendWS)
            sendFriendOnline(friendWS, accountId, username);
    });
}


function sendFriendOnline(ws, friendId, friendUsername) {
    let body = {
        messageType: "onlineNotif",
        friendUsername,
        friendId,
    };
    ws.send(JSON.stringify(body));
}


module.exports = {
    websockets, clientMap, isUserOnline
};