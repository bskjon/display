import QRCode from 'qrcode.react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useStompClient } from 'react-stomp-hooks';
import { RootState } from '../app/store';
import ProjectLogo from '../assets/logo.svg'


export default function LaunchPage() {
    const ip = useSelector((state: RootState) => state.configuration.ip);

    const client = useStompClient()
    const delay = 1000 * 10;

    useEffect(() => {
        console.log(`IP value ${ip}`);
        const fetchIp = () => {
          console.log("Calling on publish");
          console.log(client);
          if (client?.connected) {
            client?.publish({destination: "/app/configuration/ip"});
          } else {
            console.warn("Not connected to socket..");
          }
        };
      
        const recursiveTimeout = () => {
          console.log("Timer called");
          fetchIp();
          setTimeout(recursiveTimeout, delay);
        };
      
        const interval = setTimeout(recursiveTimeout, delay);
      
        return () => {
          clearTimeout(interval);
        };
      }, [ip, client, delay]);
      
      
      
      
    


    return(
        <div style={{
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                height: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>
                { ip &&
                    <div style={{backgroundColor: "white", padding: "5px"}}><QRCode value={ip} /></div>
                }
                <img style={{
                    height: "50vmin",
                    pointerEvents: "none"
                }} src={ProjectLogo} alt="logo" />
            </div>
            <p>{ip ? ip : "Offline"}</p>
        </div>

    )
}

