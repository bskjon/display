import { Injectable, OnInit } from '@angular/core';
import { CompatClient, IMessage, Stomp, StompHeaders, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Connectivity } from './models/connectivity.enum';
import { Url } from './models/url.model';
import { View, ViewItemGraphElectricityBased, ViewItemSingleNumberBased, Views, ViewType } from './models/view/View.model';
import SockJS from 'sockjs-client';
import { DatedNumberValue } from './models/view/data/DatedNumberValue';
import { Weather } from './models/view/Weather.model';
import { Climate } from './models/Climate.modal';
import { OverlayService } from './services/overlay.service';



@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  public ip: Subject<string> = new Subject<string>();
  public interval: Subject<number> = new Subject<number>();
  public connectivity: Subject<Connectivity> = new Subject<Connectivity>();
  public view: Subject<Array<View>> = new Subject<Array<View>>();

  

  public connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // https://kipalog.com/posts/Angular-12-WebSocket-example-with-Spring-Boot-WebSocket-Server---SockJS---STOMP
  // https://haseeamarathunga.medium.com/create-a-spring-boot-angular-websocket-using-sockjs-and-stomp-cb339f766a98
  private readonly serverUrl: string = this.getUrl()
  //private readonly serverUrl: string = "http://192.168.2.250:8090/";
  public socket: CompatClient | null = null;


  // https://www.digitalocean.com/community/tutorials/angular-socket-io#step-2-installing-angular-cli-and-creating-the-client-app
  constructor(
    private overlayService: OverlayService
  ) { 
    
  }

  public sendTestData() {

  //  this.view.next(tmp);
  }

  ngOnInit(): void {
    this.connect();
    console.info("Listening to: " + this.serverUrl);
  }

  connect() {
    const _this = this;
    this.socket = Stomp.over(function() {
        return new SockJS(_this.serverUrl);
    });
    this.socket.reconnectDelay = 1000;
    this.socket.connect({}, {}, function (frame: any) {
        _this.onConnected(frame, _this)
    });
    this.socket.debug = () => {}
  }

  disconnect() {
    if (this.socket != null) {
      this.socket.disconnect();
    }

    this.connected.next(false);
    console.log('Disconnected!');
  }

  private onConnected(frame: any, instance: this) {
    this.socketSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
      console.log("Connected: " + frame);
      instance.connected.next(true);
      this.subscribe();
      this.socket?.send("/app/fetch/views", {});
      this.socket?.send("/app/fetch/ip", {});
  }

  private getUrl(): string {
    var host = environment.host;
    if (!host.startsWith("http")) {
      host = "http://" + host
    }

    if (host.endsWith("/")) {
      return host + "socket"
    } else {
      return host + "/socket"
    }
  }

  private socketSubscriptions: Array<StompSubscription> = [];
  private subscribe() {
    const views = this.socket!.subscribe("/push/views", (data: IMessage) => {
      const newViews = this.decodeTo<Array<View>>(data);
      this.view.next(newViews);
    });
    const ip = this.socket!.subscribe("/push/ip", (data: IMessage) => {
      this.ip.next(data.body)
    });

    const weather = this.socket!.subscribe("/push/weather", (data: IMessage) => {
      const changed = this.decodeTo<Array<Weather>>(data);
      console.log(changed);
      this.overlayService.weatherChanges.next(changed);
    });

    const climate = this.socket!.subscribe("/push/climate", (data: IMessage) => {
      const changes = this.decodeTo<Array<Climate>>(data);
      console.log(changes);
      this.overlayService.climateChanges.next(changes);
    })


    this.socketSubscriptions = [
      views,
      ip,
      weather,
      climate
    ]
  }

  private decodeTo<T>(data: IMessage): T {
    return JSON.parse(data.body) as T
  }

  

}

