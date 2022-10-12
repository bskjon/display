import os
from socket import socket
from threading import Lock
from typing import List
from flask import Flask, copy_current_request_context
from flask_socketio import SocketIO, emit, send
from IP import IP
import eventlet
from Healthcheck import Healthcheck
from homeassistant import HA

class Connectivity:
    ONLINE = 0
    OFFLINE = 1


bgThread = None


homeassistant_helper: HA = None
app: Flask = Flask(__name__)
socketio: SocketIO = SocketIO(app, cors_allowed_origins='*', async_mode = 'eventlet')
app.debug = False

obtained_ip: str = None
if os.environ.get('HOST_IP') is None:
    obtained_ip =  IP().get_ip()
else:
    obtained_ip = os.environ.get('HOST_IP')
pass

ping_url: str = "google.com"
if os.environ.get("PING_URL") is not None:
    ping_url = os.environ.get("PING_URL")

isOffline = False
wasOffline = False

urls = []
   

def startSocket():
    eventlet.monkey_patch()
    global bgThread
    if (bgThread is None):
        bgThread = socketio.start_background_task(background_thread)
    socketio.run(app = app, host="0.0.0.0", port = 5000)
    #socketio.run(app = app, host="0.0.0.0", port = 5000, allow_unsafe_werkzeug=True)


def background_thread():
    global isOffline, wasOffline
    print("Starting background work")
    ip = IP()
    gw = ip.get_gateway()
    health = Healthcheck()
    
    while(True):
        if (wasOffline or gw is None):
            gw = ip.get_gateway()
            wasOffline = False
            socketio.sleep(30)
        
        if (gw is None):
            socketio.emit('set connectivity', Connectivity.OFFLINE, broadcast=True)
            socketio.sleep(30)
            continue
        
        response = health.Response()
        response.pingTest(gw)
        if (response.failed()): # Is offline
            isOffline = True
            print("Ping response failed", gw)
            print(response.result)
            socketio.emit('set connectivity', Connectivity.OFFLINE, broadcast=True)
            socketio.sleep(30)
            continue
        else:
            socketio.sleep(15)
            
        if (ping_url != None and len(ping_url) > 0):
            remoteTest = health.Response()
            remoteTest.pingTest(ping_url)
            if (response.failed()):
                print("Sending Offline state as internet is not available")
                socketio.emit('set connectivity', Connectivity.OFFLINE, broadcast=True)
                socketio.sleep(30)
                continue
        else:
            socketio.sleep(15)
            
        socketio.sleep(30)
        
        if isOffline == True:
            wasOffline = True
            isOffline = False
        print("Sending Online state")
        socketio.emit('set connectivity', Connectivity.ONLINE, broadcast=True)
        
        
    


@socketio.on('on add url')
def add_url(message):
    global urls
    if ("url" in message and "id" in message):
        if ("type" in message and message["type"] == "homeassistant"):
            if (homeassistant_helper is None):
                print("Cant use Home Assistnat helper as config has not been set!")
            else:
                message["url"] = homeassistant_helper.getAuthenticatedUrl(message["url"])
        urls.append(message)
    else:
        return
    print("Received: ", message, "for Display")
    emit('add url', message, broadcast=True, include_self=False)
    
    
@socketio.on('on set urls')
def replace_urls(message):
    global urls
    print("Received: ", message, "for Display")
    urls.clear()
    for item in message:
        if ("url" in item and "id" in item):
            if ("type" in item and item["type"] == "homeassistant"):
                if (homeassistant_helper is None):
                    print("Cant use Home Assistnat helper as config has not been set!")
                else:
                    item["url"] = homeassistant_helper.getAuthenticatedUrl(item["url"])
            urls.append(item)
    emit('set urls', urls, broadcast=True, include_self=False)
    

@socketio.on('on set interval')
def update_interval(message):
    print("Received interval: ", message, "for Display")
    
    emit('set interval', message, broadcast=True, include_self=False)
    
@socketio.on('set ha config')
def set_ha_config(message):
    global homeassistant_helper
    if ("username" in message and "password" in message and "ha_url" in message and "client_id" in message):
        homeassistant_helper = HA(ha_url=message["ha_url"], client_id=message["client_id"], username=message["username"], password=message["password"])
    

@socketio.on('connect')
def on_connected():
    global bgThread
    print("Client connected!")
    
    if (obtained_ip is not None):
        emit('ip obtained', obtained_ip)
        print("Forwarded", obtained_ip)
    else:
        print("Could not find ip..")
    
    if (len(urls) > 0):
        print("Sending urls", urls)
        emit('set urls', urls)
    

@socketio.on('disconnect')
def on_disconnect():
    print("A Client disconnected!")


@socketio.on('on set online')
def test_online(message):
    emit('set connectivity', Connectivity.ONLINE, broadcast=True, include_self=False)
    
@socketio.on('on set offline')
def test_offline(message):
    emit('set connectivity', Connectivity.OFFLINE, broadcast=True, include_self=False)

if __name__ == '__main__':
    startSocket()