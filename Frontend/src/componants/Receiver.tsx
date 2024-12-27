import { useEffect, useRef } from "react"

export default function Receiver()
{
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(()=>{
        const socket = new WebSocket('ws://172.29.140.126:8080');
        socket.onopen = ()=>{
            socket?.send(JSON.stringify({type:'receiver'}));
        }

        
        
        socket.onmessage = async (event) =>{
            const message = JSON.parse(event.data);
            let pc: RTCPeerConnection | null = null;
            if(message.type==='createOffer')
            {
                const pc = new RTCPeerConnection();
                pc.setRemoteDescription(message.sdp);

                pc.onicecandidate = (event)=>{
                    console.log(event);
                    if(event.candidate){
                        socket?.send(JSON.stringify({type:'iceCandidate', candidate:event.candidate}));
                    }
                }

                pc.ontrack = (event) => {
                    console.log(event);
                    const video = document.createElement('video');
                    document.body.appendChild(video);
                   
                    // Set the muted attribute to allow autoplay
                    video.muted = true;
                    video.srcObject = new MediaStream([event.track]);

                    // Play the video after appending it to the document
                    video.play().catch((error) => {
                        console.error("Video playback failed:", error);
                    });
                    
                }

                const answer = await pc.createAnswer();

                await pc.setLocalDescription(answer);

                socket?.send(JSON.stringify({type:'createAnswer',  sdp:pc.localDescription}));


            }
            else if(message.type=== 'iceCandidate')
            {
                if(pc!==null)
                {
                    //@ts-ignore
                    pc.addIceCandidate(message.candidate);
                }
            }
        }
        
        
    },[]);  


    return(
        <div>
            Reciever
            {/* <video ref = {videoRef}></video> */}
            
        </div>
    )
}