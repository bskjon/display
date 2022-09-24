from flask import Flask
from flask_socketio import SocketIO,emit, send


class Server:
    
    app: Flask = Flask(__name__)
    socketio: SocketIO = SocketIO(app, cors_allowed_origins='*')
    
    def __init__(self) -> None:
        self.socketio.run(app = self.app, port = 5000)
        

    @socketio.on('on add url')
    def add_url(message):
        emit('add url', message)
        
    @socketio.on('on replace urls')
    def replace_urls(message):
        emit('replace urls', message)

    @socketio.on('on change interval')
    def update_interval(message):
        emit('set interval', message)
        
    @socketio.on('connect')
    def on_connected():
        print("Client connected!")

    @socketio.on('disconnect')
    def on_disconnect():
        print("A Client disconnected!")

    def add(self, url: str):
        self.socketio.emit('add url', url)
    


if __name__ == '__main__':
    Server()