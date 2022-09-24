import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss']
})
export class DisplayPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NgbCarousel) carusel!: NgbCarousel;

  protected urlList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  protected subscriptions: Subscription[] = [];

  constructor(
    public appService: AppService
  ) { 
    this.appService.urlRef.subscribe(newUrl => {
      newUrl.forEach(url => {
        console.log("New url: " + url.url)
      })
    })

  }

  ngOnInit(): void {

    this.urlList.next([
      "https://www.home-assistant.io/",
      "https://iktdev.no"
    ])
  }

  ngAfterViewInit(): void {
    const cycleIntervalChanged = this.appService.CYCLE_INTERVAL.subscribe(interval => {
      this.carusel.interval = interval;
      console.log(this.carusel.interval)
    });
    this.subscriptions.push(cycleIntervalChanged)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    })
  }
  


}
