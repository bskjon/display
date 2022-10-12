import socket
from typing import Optional
import pingparsing

class Healthcheck():
    result: Optional[str]
    
    
    def isInternetAvailable(self, url):
        """Check"""
        try:
            s = socket.create_connection(url, 60)
            if s is not None:
                s.close
            return True
        except Exception as e:
            print(e)
            pass
        return False
    
    
    
    class Response():
        parser = pingparsing.PingParsing()
        result = None
        
        def pingTest(self, target):
            transmitter = pingparsing.PingTransmitter()
            transmitter.destination = target
            transmitter.count = 4
            result = transmitter.ping()
            self.result = self.parser.parse(result).as_dict()
            
        def hadPingPacketLoss(self) -> bool:
            """Check if ping resulted in packet loss
            
            If there were no ping performed, True will be returned..
            """
            if (self.result is None or self.result['packet_loss_count'] == 0):
                return False
            else:
                return True
            
        def failed(self) -> bool:
            if (self.result is None or self.result['destination'] is None or self.result['packet_loss_rate'] >= 33):
                return True
            else:
                return False