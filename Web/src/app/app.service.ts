import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Url } from './models/url.model';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  public IP_ADDRESS: BehaviorSubject<string> = new BehaviorSubject<string>("UNKNOWN");
  public CYCLE_INTERVAL: BehaviorSubject<number> = new BehaviorSubject<number>(10000);
  public urlRef: BehaviorSubject<Array<Url>> = new BehaviorSubject<Array<Url>>([]);

  private subscriptions: Array<Subscription> = []

  constructor(
    protected socket: SocketService,
    private router: Router
  ) {
    this.subscriptions = [
      this.ipSub(),
      this.urlSubList(),
      this.urlSub()
    ];

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const rootPath = val.urlAfterRedirects.split('/').filter(item => item)
        if (rootPath.length > 0) {return;}
           
      }
    });

  }

  private ipSub(): Subscription {
    return this.socket.ip.subscribe((ip) => {
      console.log("New ip" + ip);
      this.IP_ADDRESS.next(ip);
    });
  }

  private urlSub(): Subscription {
    return this.socket.url.subscribe((url) => {
      const updatedUrls = [
        ...this.urlRef.getValue(),
        url
      ];
      console.log("Appended to urls");
      console.log(updatedUrls);
      this.urlRef.next(updatedUrls);
      if (updatedUrls.length > 0) {
        this.router.navigate(['/display'])
      }
    })
  }

  private urlSubList(): Subscription {
    return this.socket.urls.subscribe((urls) => {
      this.urlRef.next(urls);
      console.log("New urls");
      console.log(urls);
      if (urls.length == 0) {
        this.router.navigate([''])
      } else {
        this.router.navigate(['/display'])
      }
    });
  }

  
  ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
