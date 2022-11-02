import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { isNil, takeWhile } from 'lodash';
import { BehaviorSubject, filter, find, first, Subscription, take, takeUntil, tap } from 'rxjs';
import { IdBehaviourSubject, LiveWatt } from 'src/app/models/data.models';
import { KV } from 'src/app/models/view/Weather.model';
import { LiveValueService } from 'src/app/services/live-value.service';

@Component({
  selector: 'app-live-counter-view',
  templateUrl: './live-counter-view.component.html',
  styleUrls: ['./live-counter-view.component.scss']
})
export class LiveCounterViewComponent implements OnInit, OnDestroy {
  @Input() public liveValueId: string | null = null
  public meterLiveValue: number = 0o0

  private liveValueSubscriber: Subscription | null = null;
  private meterLiveConsumptionSubscriber: Subscription | null = null
  constructor(
    public live: LiveValueService
  ) { }

  ngOnInit(): void {
    this.meterLiveConsumptionSubscriber = this.live.meterLiveConsumption.subscribe(
      (values) => {
        console.log(values);
        const desiredSubscriber = values.find(value => value.id === this.liveValueId)
        if (!isNil(desiredSubscriber)) {
          this.setDesiredSubscribtion(desiredSubscriber);
        }
    })
  }

  private setDesiredSubscribtion(sub: IdBehaviourSubject<LiveWatt>) {
    this.meterLiveConsumptionSubscriber?.unsubscribe();
    this.meterLiveConsumptionSubscriber = null;
    this.liveValueSubscriber = sub.subscribe((value) => {
      this.meterLiveValue = value.power
    });
  }
 
  ngOnDestroy(): void {
      this.liveValueSubscriber?.unsubscribe();
      this.meterLiveConsumptionSubscriber?.unsubscribe();
  }

}
