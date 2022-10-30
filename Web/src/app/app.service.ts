import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isNil } from 'lodash';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Connectivity } from './models/connectivity.enum';
import { Url } from './models/url.model';
import { ObservableView } from './models/view/ObservableView';
import { View } from './models/view/View.model';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  public connectionState: Connectivity = Connectivity.ONLINE;
  protected pageToReturnToOnOnline: string = "";

  public IP_ADDRESS: BehaviorSubject<string> = new BehaviorSubject<string>("UNKNOWN");
  public CYCLE_INTERVAL: BehaviorSubject<number> = new BehaviorSubject<number>(30000);


  public views: BehaviorSubject<Array<ObservableView>> = new BehaviorSubject<Array<ObservableView>>([]);

  private subscriptions: Array<Subscription> = []

  constructor(
    protected socket: SocketService,
    private router: Router
  ) {
    this.subscriptions = [
      this.socket.ip.subscribe((ip) => {
        console.log("New ip" + ip);
        this.IP_ADDRESS.next(ip);
      }),
      this.viewList(),
      this.connectivityHandler(),
      this.socket.interval.subscribe((nmbr) => this.CYCLE_INTERVAL.next(nmbr))
    ];

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const rootPath = val.urlAfterRedirects.split('/').filter(item => item)
        if (rootPath.length > 0) {return;}
           
      }
    });

    this.socket.sendTestData();
  }


  private viewList(): Subscription {
    return this.socket.view.subscribe((views: View[]) => {
      console.log(views);
      if (views.length === 0 && this.views.value.length === 0) {
        this.router.navigate(['/display'])
      }
      views.forEach((view: View) => {

        const toBeAdded: Array<ObservableView> = [];

        const ex = this.views.value.find((item) => item.viewId === view.viewId)
        if (isNil(ex)) {
          toBeAdded.push({
            viewId: view.viewId,
            type: view.type,
            viewWrapper: new BehaviorSubject(view)
          } as ObservableView);
        } else {
          ex.viewWrapper.next(view)
        }

        const updatedViews = [
          ...this.views.value,
          ...toBeAdded
        ]
        console.log(updatedViews);
        this.views.next(updatedViews);
        console.log("Updated with");
        console.log(updatedViews)
        if (updatedViews.length > 0 && window.location.pathname.split("/")[0] != "display") {
          this.router.navigate(['/display'])
        }
      });
    });
  }

  private connectivityHandler(): Subscription {
    return this.socket.connectivity.subscribe((val: Connectivity) => {
      console.log("Info " + val.toString())
      switch (val) {
        case Connectivity.ONLINE:
          if (this.connectionState != Connectivity.ONLINE) {
            this.router.navigate([this.pageToReturnToOnOnline]);
            console.log("Navigating to prev")
          }
          break;
        case Connectivity.OFFLINE:
          if (this.connectionState != Connectivity.OFFLINE) {
            this.pageToReturnToOnOnline = window.location.pathname
            this.router.navigate(['/offline'])
          }
      }
      this.connectionState = val;
    })
  }

  
  ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
