import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { isNil, over } from 'lodash';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Climate } from 'src/app/models/Climate.modal';
import { Views } from 'src/app/models/view/View.model';
import { Weather } from 'src/app/models/view/Weather.model';


@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {
  public hasAppeard: boolean = false

  @Input() visibility!: boolean
  @Output() visibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() toOverlay: BehaviorSubject<Weather | Climate | null> = new BehaviorSubject<Weather | Climate | null>(null);

  public weather: BehaviorSubject<Weather | null> = new BehaviorSubject<Weather | null>(null);
  public climate: BehaviorSubject<Climate | null> = new BehaviorSubject<Climate | null>(null);

  private subs: Array<Subscription> = []
  constructor(

  ) { }


  ngOnInit(): void {
    this.subs.forEach((it) => it.unsubscribe());
    this.subs.push(
      this.toOverlay.subscribe((value) => this.setOverlayBasedOnItem(value))
    );
    this.subs.push(
      this.visibilityChange.subscribe(state => {
        console.log("vc => " + state);
        
      })
    )
  }

  ngOnDestroy(): void {
      this.subs.forEach((it) => it.unsubscribe())
  }

  private setOverlayBasedOnItem(overlayItem: Climate | Weather | null): void {
    console.log(overlayItem);
    this.weather.next(null);
    this.climate.next(null);
    if (isNil(overlayItem)) {
      return;
    }
    
    if (overlayItem.type === Views.WEATHER) {
      this.weather.next(<Weather>overlayItem);
    }
    else if (overlayItem.type === Views.CLIMATE) {
      this.climate.next(<Climate>overlayItem);
    }
    this.hasAppeard = true;
  }

  
}
