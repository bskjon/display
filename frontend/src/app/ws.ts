import { IMessage } from "@stomp/stompjs/esm6";
import { useSubscription } from "react-stomp-hooks";

export const wsUrl = window.env?.websocketUrl || `${window.location.protocol}//${window.location.hostname}:8080/ws`;

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
