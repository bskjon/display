import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  protected subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public appService: AppService
  ) {   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const cycleIntervalChanged = this.appService.CYCLE_INTERVAL.subscribe(interval => {
      this.carusel.interval = interval;
      console.log(this.carusel.interval)
    });
    this.subscriptions.push(cycleIntervalChanged)
    if (this.appService.urlRef.getValue().length == 0) {
      this.router.navigate([''])
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    })
  }
  


}
