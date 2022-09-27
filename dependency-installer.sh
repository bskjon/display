#!/bin/bash

mkdir -p /usr/sbin/

version=$(basename $(curl -fs -o/dev/null -w %{redirect_url} https://github.com/kyubisation/angular-server-side-configuration/releases/latest))

if [[ $TARGETARCH == "arm"* ]] 
then 
    echo "Detected Target Arch ARM" $TARGETARCH >> /usr/sbin/ngssc.info
    curl -L "https://github.com/bskjon/angular-server-side-configuration/releases/download/master/ngssc_arm_32bit" -o /usr/sbin/ngssc
   # curl -L "https://github.com/kyubisation/angular-server-side-configuration/releases/download/$version/ngssc_32bit" -o /usr/sbin/ngssc
else
    echo "Default x86_x64" $TARGETARCH >> /usr/sbin/ngssc.info
    curl -L "https://github.com/kyubisation/angular-server-side-configuration/releases/download/$version/ngssc_64bit" -o /usr/sbin/ngssc
fi

chmod +x /usr/sbin/ngssc