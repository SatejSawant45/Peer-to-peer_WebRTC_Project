import { useEffect } from "react"

export default function Receiver()
{
    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = ()=>{
            socket.send(JSON.stringify({type:'sender'}));
        }
        
        socket.onmessage = async (event) =>{
            const message = JSON.parse(event.data);

            if(message.type==='create-offer')
            {
                const pc = new RTCPeerConnection();
                pc.setRemoteDescription(message.sdp);

                const answer = await pc.createAnswer();

                await pc.setLocalDescription(answer);

                socket.send(JSON.stringify({type:'createAnswer',  sdp:pc.localDescription}))


            }
        }
        
        
    },[]);


    return(
        <div>
            Reciever
            
        </div>
    )
}