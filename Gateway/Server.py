import os
from typing import List
from flask import Flask
from flask_socketio import SocketIO, emit, send
from threading import Thread
from IP import IP
import eventlet

app: Flask = Flask(__name__)
socketio: SocketIO = SocketIO(app, cors_allowed_origins='*', async_mode = 'eventlet')
app.debug = False

obtained_ip: str = None
if os.environ.get('HOST_IP') is None:
    obtained_ip =  IP().get_ip()
else:
    obtained_ip = os.environ.get('HOST_IP')
pass

urls = []


def startSocket():
    eventlet.monkey_patch()
    socketio.run(app = app, host="0.0.0.0", port = 5000)
    #socketio.run(app = app, host="0.0.0.0", port = 5000, allow_unsafe_werkzeug=True)

@socketio.on('on add url')
def add_url(message):
    global urls
    if ("url" in message and "id" in message):
        urls.append(message)
    else:
        return
    print("Received: ", message, "for Display")
    emit('add url', message, broadcast=True, include_self=False)
    
    
@socketio.on('on set urls')
def replace_urls(message):
    global urls
    print("Received: ", message, "for Display")
    emit('set urls', message, broadcast=True, include_self=False)
    urls.clear()
    for item in message:
        if ("url" in item and "id" in item):
            urls.append(item)

@socketio.on('on set interval')
def update_interval(message):
    print("Received interval: ", message, "for Display")
    
    emit('set interval', message, broadcast=True, include_self=False)
    
@socketio.on('connect')
def on_connected():
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

        

if __name__ == '__main__':
    startSocket()