import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { isNil } from 'lodash';
import { BehaviorSubject, delay, Subscription } from 'rxjs';
import { Climate } from '../models/Climate.modal';
import { Weather } from '../models/view/Weather.model';

@Injectable({
  providedIn: 'root'
})
export class OverlayService implements OnDestroy {

  public isVisible: boolean = false;
  public showDuration: number = this.toSeconds(10);

  private subscribers: Array<Subscription> = []

  public weatherChanges: BehaviorSubject<Array<Weather>> = new BehaviorSubject<Array<Weather>>([]);
  public climateChanges: BehaviorSubject<Array<Climate>> = new BehaviorSubject<Array<Climate>>([]);

  private clearableQueue: Array<Weather|Climate> = [];
  public toOverlay: BehaviorSubject<Weather | Climate | null> = new BehaviorSubject<Weather | Climate | null>(null);

  constructor() { 
    const climateSub = this.climateChanges.subscribe((value: Array<Climate>) => {
      this.clearableQueue.push(...value);
    });
    const weatherChanges = this.weatherChanges.subscribe((value: Array<Weather>) => {
      this.clearableQueue.push(...value);
    });
    this.subscribers = [
      climateSub,
      weatherChanges
    ]

    this.displayAndClearQueue();
  }

  ngOnDestroy(): void {
      this.subscribers.forEach((it) => it.unsubscribe());
  }


  async displayAndClearQueue() {
    console.log("Running iteration on " + this.clearableQueue.length + " items");
    if (this.clearableQueue.length > 0) {
      const toDisplay = this.clearableQueue.pop();
      if (isNil(toDisplay)) {
        this.displayAndClearQueue();
        return;
      }
      setTimeout(() => { 
        this.displayAndClearQueue();
      }, this.showDuration);
      this.toOverlay.next(toDisplay);
      if (this.isVisible != true) this.isVisible = true; 

    } else {
      if (this.isVisible != false) {
        this.isVisible = false;
      }
      setTimeout(() => { 
        this.displayAndClearQueue();
      }, 5000);
    }

  }


  toSeconds(multiplier: number): number {
    return multiplier*1000;
  }

}
