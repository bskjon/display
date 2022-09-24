import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public IP_ADDRESS: BehaviorSubject<string> = new BehaviorSubject<string>("UNKNOWN");
  public CYCLE_INTERVAL: BehaviorSubject<number> = new BehaviorSubject<number>(10000);
  public urlRef = this.socket.url;

  constructor(
    protected socket: SocketService
  ) { }

  
}
