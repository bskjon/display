import { IMessage } from "@stomp/stompjs/esm6";
import { useSubscription } from "react-stomp-hooks";
import dotenv from 'dotenv';

dotenv.config();
const deploymentPort = process.env.DEPLOYMENT_PORT || "8080";
export const wsUrl = `http://localhost:${deploymentPort}/ws`

export function useWsSubscription<T>(path: string, processData: (data: T) => void,
) {
    return useSubscription(path, (payload: IMessage) => {
        const converted = toType<T>(payload);
        processData(converted)
    })
}

function toType<T>(data: IMessage): T {
    return JSON.parse(data.body) as T;
}
