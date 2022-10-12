from typing import Optional
import requests
import json
import base64
import urllib.parse
import os

class HA():
    _ha_url: str
    _client_id: str
    _username: str
    _password: str
        
    def __init__(self, ha_url, client_id, username, password) -> None:
        self._ha_url = ha_url
        self._client_id = client_id
        self._username = username
        self._password = password
        
    
    def get_state(self) -> str:
        state = {
            "hassUrl": self._ha_url,
            "clientId": self._client_id
        }
        js = json.dumps(state)
        return base64.b64encode(bytes(js, encoding="utf8"))
        
    
    def get_flow_id(self) -> Optional[str]:
        payload = {
            "client_id":self._client_id,
            "handler":["homeassistant", None],
            "redirect_uri":"{url}/?auth_callback=1".format(url=self._ha_url)
        }
        
        result = requests.post(url="{base}/auth/login_flow".format(base=self._ha_url), data=json.dumps(payload))
        return result.json()["flow_id"]
    
    def get_code(self, flow_id) -> Optional[str]:
        payload = {
            "username":"frame",
            "password":"frame",
            "client_id": self._client_id
        }
        result = requests.post(url="{base}/auth/login_flow/{flow_id}".format(base=self._ha_url, flow_id = flow_id), data=json.dumps(payload))
        return result.json()["result"]
    
    def triggerPreAuth(self, url):
        result = requests.get(url=url)
        print(result)
    
    
    def getAuthenticatedUrl(self, destination: str) -> str:
        flow_id = self.get_flow_id()
        self._ha_code = self.get_code(flow_id=flow_id)
        params = urllib.parse.urlencode({
            "auth_callback": 1,
            "code": self._ha_code,
            "state": self.get_state(),
            "storeToken": True
        })
        authUrl:str
        present_paramters: str = os.path.basename(destination)
        if (present_paramters is None or len(present_paramters) == 0 or "?" not in present_paramters):
            authUrl = "{url}?{params}".format(url=destination, params=params)
        else:
            authUrl = "{url}&{params}".format(url=destination, params=params)
        print(authUrl)
        return authUrl
  