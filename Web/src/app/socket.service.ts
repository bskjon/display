import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Url } from './models/url.model';


@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  public url = this.socket.fromEvent<Url[]>('set url');

  // https://www.digitalocean.com/community/tutorials/angular-socket-io#step-2-installing-angular-cli-and-creating-the-client-app
  constructor(
    private socket: Socket
  ) { 
    this.socket.on('add url', (data) =>  {
      console.log(data)
    });
  }

  ngOnInit(): void {
      this.socket.on('disconnect', () => {
        setTimeout(() => {
          this.socket.connect()
        }, 1000);
      });
  }
  

}
