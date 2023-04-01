import React, { useState, useEffect, CSSProperties, useRef } from 'react';

interface Log {
  type: string;
  message: string;
  styles: CSSProperties;
}

function ConsoleLog() {
  const [logs, setLogs] = useState<Log[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (message) => {
      originalLog(message);
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          type: 'LOG',
          message: message,
          styles: { color: 'white' },
        },
      ]);
    };

    console.warn = (message) => {
      originalWarn(message);
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          type: 'WARN',
          message: message,
          styles: { color: 'orange' },
        },
      ]);
    };

    console.error = (message) => {
      originalError(message);
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          type: 'ERROR',
          message: message,
          styles: { color: 'red' },
        },
      ]);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    const consoleDiv = consoleRef.current;
    if (consoleDiv) {
      consoleDiv.scrollTop = consoleDiv.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      style={{
        textAlign: 'left',
        overflowY: 'scroll',
        height: '100vh',
      }}
      ref={consoleRef}
    >
      {logs.map((log, index) => (
        <div key={index}>
          <p style={{ margin: 0 }}>
            <span style={log.styles}>[{log.type}]</span>: {log.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ConsoleLog;
