#!/bin/sh

echo "[INFO] ngssc Build info"
cat /usr/sbin/ngssc.info

echo " "
echo "[INFO] Running ngssc insert"

ngssc insert /usr/share/nginx/html