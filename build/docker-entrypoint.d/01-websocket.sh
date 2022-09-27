#!/bin/bash

termination(){
    echo "---------------------------------------------------"
    echo ""
    echo "[Info] Stopping WS Server"
    echo ""
    kill -SIGINT $PID_SERVER
    exit 0
}

trap 'termination' SIGTERM

python3 -u /usr/share/socket/Server.py &
PID_SERVER=$!

exec "$@"

# wait # For wait on exit code