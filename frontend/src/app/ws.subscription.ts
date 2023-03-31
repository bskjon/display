import { useEffect } from 'react';
import { webSocketClient } from './ws.client';

export function useSubscription<T>(path: string, processData: (data: T) => void) {
  useEffect(() => {
    webSocketClient.onConnect(() => {
      webSocketClient.subscribe<T>(path, processData);
    });
    return () => {
      webSocketClient.unsubscribe(path);
    };
  }, [path, processData]);
}
