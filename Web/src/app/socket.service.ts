import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Url } from './models/url.model';


@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  public urls = this.socket.fromEvent<Url[]>('set urls');
  public ip = this.socket.fromEvent<string>('ip obtained');
  public url = this.socket.fromEvent<Url>('add url');

  // https://www.digitalocean.com/community/tutorials/angular-socket-io#step-2-installing-angular-cli-and-creating-the-client-app
  constructor(
    private socket: Socket
  ) { 
    this.socket.on('connect', () => {
      console.info("Connected to socket!");
    })
    this.socket.on('disconnect', () => {
      console.info("Disconnected");
      setTimeout(() => {
        this.socket.connect()
      }, 1000);
    });
  }



  ngOnInit(): void {
      
  }
  

}
