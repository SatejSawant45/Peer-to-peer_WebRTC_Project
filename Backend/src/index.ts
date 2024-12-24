import { WebSocketServer , WebSocket } from "ws";
 
const wss = new WebSocketServer({ port:8080 });

let senderSocket: null | WebSocket= null;

let recieverSocket: null | WebSocket = null;

wss.on('connection',function connection(ws){
    ws.on('errror',console.error);

    ws.on('message',function message(data:any){
            const message = JSON.parse(data);

            if(message.type === "identify-as-sender")
            {
                senderSocket = ws;
            }
            else if(message.type === "identify-as-reciever")
            {
                recieverSocket = ws;
            }
            else if(message.type === "create-offer")
            {
                recieverSocket?.send(JSON.stringify({type:"offer", offer:message.offer}))
            }
            else if(message.type==="create-answer")
            {
                senderSocket?.send(JSON.stringify({type:"offer",offer:message.offer}))
            }

            //identify as sender
            // identify as reciever
            // create offer
            //create answer
            // add ice candidate



            
    });

 
});