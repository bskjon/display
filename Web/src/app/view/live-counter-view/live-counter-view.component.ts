import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LiveValueService } from 'src/app/services/live-value.service';

@Component({
  selector: 'app-live-counter-view',
  templateUrl: './live-counter-view.component.html',
  styleUrls: ['./live-counter-view.component.scss']
})
export class LiveCounterViewComponent implements OnInit, OnDestroy {

  public meterLiveValue: number = 0o0

  private subs: Subscription[] = [];
  constructor(
    public live: LiveValueService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.live.meterLiveConsumption.subscribe((value) => {
        this.meterLiveValue = value;
      })
    )
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe());
  }

}
