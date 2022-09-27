import socketio
import asyncio
import uuid

class Client():
    
    host: str
    port: int = 5000
    
    sio = socketio.Client()
    
    def __init__(self, host, port = 5000) -> None:
        self.host = host
        self.port = port
        
    def connect(self):
        self.sio.connect("http://"+self.host + ":" + str(self.port))
        # await self.sio.wait()
    def disconnect(self):
        self.sio.disconnect()
    
    def add_url(self, id: str = str(uuid.uuid4()), url: str = None):
        if (url is None):
            raise Exception("Url not provided!")
        self.sio.emit('on add url', {'id': id, 'url': url })
    
    def set_urls(self):
        urls = []