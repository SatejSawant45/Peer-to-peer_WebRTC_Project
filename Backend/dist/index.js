"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let recieverSocket = null;
wss.on('connection', function connection(ws) {
    ws.on('errror', console.error);
    ws.on('message', function message(data) {
        const message = JSON.parse(data);
        if (message.type === "identify-as-sender") {
            senderSocket = ws;
        }
        else if (message.type === "identify-as-reciever") {
            recieverSocket = ws;
        }
        else if (message.type === "create-offer") {
            recieverSocket === null || recieverSocket === void 0 ? void 0 : recieverSocket.send(JSON.stringify({ type: "offer", offer: message.offer }));
        }
        else if (message.type === "create-answer") {
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "offer", offer: message.offer }));
        }
        //identify as sender
        // identify as reciever
        // create offer
        //create answer
        // add ice candidate
    });
});
