class EventEmitter {
    constructor() {
        this._events = {};
    }

    on(name, listener) {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(listener);
    }

    removeListener(name, listenerToRemove) {
        if (!this._events[name]) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }

        const filterListeners = (listener) => listener !== listenerToRemove;

        this._events[name] = this._events[name].filter(filterListeners);
    }

    emit(name, data) {
        if (!this._events[name]) {
            throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
        }

        const fireCallbacks = (callback) => {
            callback(data);
        };

        this._events[name].forEach(fireCallbacks);
    }
}


export let websocket;

export let WSEventHandler = new EventEmitter();


function onOpen(){
    console.log("Connected to WS");
}

function onClose(){
    console.log("Disconnected from WS");
}

function onMessage(event) {
    console.log("Got message:" + event.data);
    try{
        let msg = JSON.parse(event.data);

        if(msg.messageType === "onlineNotif"){
            WSEventHandler.emit('onlineNotif', msg);
        }

    } catch(error) {
        console.log("Failed to parse WS message.")
    }

}

function createSocket(){
    websocket = new WebSocket('ws://localhost:8000');
    websocket.onopen = onOpen;
    websocket.onmessage = onMessage;
    websocket.onclose = onClose;
    return websocket;
}


export const reconnectWS = () => {
    if(websocket.readyState === WebSocket.OPEN){
        websocket.close();
    }
    websocket = createSocket();
    console.log("reconnected!");
}

createSocket();

