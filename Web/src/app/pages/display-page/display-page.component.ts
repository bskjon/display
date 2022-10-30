import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ViewType } from 'src/app/models/view/View.model';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss']
})
export class DisplayPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NgbCarousel) public carusel: NgbCarousel;
  @ViewChildren('parent') caruselViews: QueryList<ElementRef>;

  public slid: Subject<NgbSlideEvent> = new Subject();

  protected subscriptions: Subscription[] = [];
  ViewType = ViewType;

  constructor(
    private router: Router,
    public appService: AppService,
    private self: ElementRef
  ) {   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const cycleIntervalChanged = this.appService.CYCLE_INTERVAL.subscribe(interval => {
      this.carusel.interval = interval;
    });
    this.subscriptions.push(cycleIntervalChanged)
    if (this.appService.views.getValue().length == 0) {
      this.router.navigate([''])
    }

    this.carusel.slid.subscribe((event: NgbSlideEvent) => this.slid.next(event));
    
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    })
  }
  


}
