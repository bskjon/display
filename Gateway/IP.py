import netifaces
import sys

class IP:
    def get_ip(self) -> str:
        """Attempts to identify Host Lan IP
        
        Assumption values:
        0 = LAN
        1 = WAN
        2 = Gateway
        """
        
        ifaces = []
        for iface in netifaces.interfaces():
            inets = netifaces.ifaddresses(iface).setdefault(netifaces.AF_INET, None)
            if (inets is None or iface == "lo" or "br-" in iface or "veth" in iface):
                # print("No inets found on", iface)
                continue
            for addrs in inets:
                if ('addr' not in addrs):
                    continue
                ip: str = addrs['addr']
                octets = ip.split(".") 
                if (len(octets) == 4 and octets[0] in ["172", "10", "192"]):
                    assumption = 0
                    if (octets[3] == "0"):
                        """Why does the ip ends with 0, miss configuration?"""
                        assumption = -1
                        # print("IP Range provided, not IP address..", iface, ip)
                    elif (octets[3] == "1"):
                        """Why is gateway ip provided"""
                        assumption = 2
                        # print("Gateway IP address provided..", iface, ip)
                    elif (octets[3] == "255"):
                        """Why is broadcast ip provided"""
                        assumption = -1
                        # print("Broadcast address provided, not IP address..", iface, ip)
                    if (assumption > -1):
                        ifaces.append({
                            "name": iface,
                            "ip": addrs['addr'],
                            "assumption": assumption
                        })
                else:
                    ifaces.append({
                        "name": iface,
                        "ip": addrs['addr'],
                        "assumption": 1
                    })
                    
                    
        ifaces.sort(key=lambda x: x['assumption'])
        if (len(ifaces) > 0):
            return ifaces[0]["ip"]
        else:
            return None
        
if __name__ == '__main__':
    ip = IP()
    ip = ip.get_ip()
    print(ip)
    sys.exit(0)