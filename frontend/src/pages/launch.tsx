import QRCode from 'qrcode.react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStompClient } from 'react-stomp-hooks';
import { RootState } from '../app/store';
import ProjectLogo from '../assets/logo.svg'
import ConsoleLog from '../features/console';
import dotenv from 'dotenv'


export default function LaunchPage() {
  dotenv.config();
  const debug = process.env.DEBUG || false;

    const ip = useSelector((state: RootState) => state.configuration.ip);

    const client = useStompClient()
    const delay = 1000 * 10;

    useEffect(() => {
        console.log(`IP value ${ip}`);
        const fetchIp = () => {
          if (client?.connected) {
            client?.publish({destination: "/app/configuration/ip"});
          } else {
            console.warn("Not connected to socket..");
          }
        };
      
        const recursiveTimeout = () => {
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

            { debug && 
              <div style={{ 
                display: "block",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh"
               }}><ConsoleLog /></div>
            }
        </div>
    )
}

