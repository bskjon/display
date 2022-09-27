# 🚧 Work in progress

<img src="Web/src/assets/display.svg" style="height: 250px;" />


## What is "Display"
Display is a project intended to simply display websites in a kiosk mode.
The idea behind Display is to run a webbrowser in kiosk mode with Display as the only source, by doing this you will be able to either show a single page, or let it cycle through all defined websites.
As the website communicates over a websocket service, you can change or add the pages displayed without restarting the webbrowser.

<br />

The easiest way to run Display is through Docker
```docker
docker run -d --network host --name display bskjon/display
```
<br/>

If you don't want to run the docker container with host network, please ensure that you pass in the IP of the network you want the webpage to be available at. 
<br/>
<br/>
Example:
```docker
docker run -d -e HOST_IP=10.0.0.2 --name display bskjon/display
```
By defining the environment variable "HOST_IP" you will tell both the websocket and the webpage which IP to excpect and interact over.

<br />
The docker image is multiarchitecture created, so it should work on traditional architecture (x86) and ARM

<br />

## Ports
```text
Webserver:  80
Websocket:  5000
```