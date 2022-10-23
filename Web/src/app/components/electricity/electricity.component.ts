import { EventEmitter, HostListener } from '@angular/core';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { isNil } from 'lodash';
import { ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexFill, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent, XAxisAnnotations } from 'ng-apexcharts';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DatedNumberValue } from 'src/app/models/view/data/DatedNumberValue';
import { View, ViewItem, ViewItemGraphElectricityBased, ViewItemSingleNumberBased, ViewItemSingleDatedNumberBased, ViewItemUnit, Views, ViewType } from 'src/app/models/view/View.model';


@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.scss']
})

export class ElectricityComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @ViewChild("main", { static: false }) main: ElementRef;
  public chartSeries: ApexAxisChartSeries = [];

  public chartConfig: ApexChart = {
    type: "line",
    stacked: false,
    background: '#000',
    toolbar: {
      show: false
    }
  }
  public chartXAxis: ApexXAxis = {
    type: 'datetime'
  }

  public chartYAxis: Array<ApexYAxis> = [];

  public chartStroke: ApexStroke = {
    width: 0,
    curve: 'smooth'
  }

  public chartAnnotations: ApexAnnotations = {
    xaxis: [],
    yaxis: []
  }

  @Input() public viewId: string
  @Input() public view?: BehaviorSubject<View>;
  @Input() public slid?: Subject<NgbSlideEvent>
  public price_now: BehaviorSubject<string> = new BehaviorSubject<string>("N/A");
  public price_now_unit: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public price_min: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public price_avg: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public price_max: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);


  onResized(event) {
    console.warn(event);
  }


  private subscriptions: Subscription[] = []

  constructor(
    private appService: AppService,
    private self: ElementRef
  ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    })
  }


  ngOnInit(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    const sliderSub = this.slid?.subscribe((event: NgbSlideEvent) => {
      this.ngOnInit();
    });
    if (!isNil(sliderSub)) {
      this.subscriptions.push(sliderSub);
    }

    if (this.view != null) {
      this.subscriptions.push(this.view.subscribe((view: View) => {
        this.viewUpdates(view)
      }))
    }
  }

  ngAfterViewInit(): void {
    console.log(this.main.nativeElement.offsetWidth)
  }

  private graphTypes = [
    Views.GRAPH_ELECTRICITY_CONSUMPTION,
    Views.GRAPH_ELECTRICITY_PRICE,
  ]

  private viewUpdates(view: View) {
    view.views.forEach((view) => {
        if (this.graphTypes.includes(view.viewType) ) 
        {
          this.updateChartSeries(<ViewItemUnit>view);
        } 
        else if (view.viewType === Views.ELECTRICITY_PRICE) 
        {
          const elPrice = <ViewItemSingleDatedNumberBased>view;
          this.price_now.next(elPrice.value.value.toString());
          this.price_now_unit.next(elPrice.unitOfMeasurement.toString());

          const priceNowAnnotation: XAxisAnnotations = 
          {
            id: elPrice.viewItemId,
            borderColor: '#775DD0',
            label: {
              style: {
                color: '#fff',
                background: '#775DD0'
              },
              text: "Nå",
              borderColor: '#775DD0'
            },
            x: elPrice.value.at
          }
          
          const excludeSelf = this.chartAnnotations.xaxis?.filter((item) => item.id != priceNowAnnotation.id)
          this.chartAnnotations.xaxis = [
            ...(!isNil(excludeSelf)) ? excludeSelf : [],
            priceNowAnnotation
          ]
          console.log(this.chartAnnotations)
        
        } 
        else if (view.viewType === Views.ELECTRICITY_PRICE_MIN) {
          const elp = <ViewItemSingleNumberBased>view
          this.price_min.next(elp.value.toFixed(2))
        } 
        else if (view.viewType === Views.ELECTRICITY_PRICE_AVG) {
          const elp = <ViewItemSingleNumberBased>view
          this.price_avg.next(elp.value.toFixed(2))
        } 
        else if (view.viewType === Views.ELECTRICITY_PRICE_MAX) {
          const elp = <ViewItemSingleNumberBased>view
          this.price_max.next(elp.value.toFixed(2))
        } else {
          console.log("Matches no one")
        }
    });
  }

  private costSeries: ApexAxisChartSeries = [];
  private usageSeries: ApexAxisChartSeries = [];
  
  private costYAxis: ApexYAxis|null = null
  private usageYAxis: ApexYAxis|null = null

  private updateChartSeries(view: ViewItemGraphElectricityBased): void {
    console.log("Updating Charts")
    const newValue: ApexAxisChartSeries = [
      {
        name: view.title,
        data: this.transform(view.value),
        type: (view.viewType === Views.GRAPH_ELECTRICITY_PRICE) ? 'area' : 'bar',
        color: (view.viewType === Views.GRAPH_ELECTRICITY_PRICE) ? '#FFA500': '#00a8e6'
      }
    ]
    if (view.viewType === Views.GRAPH_ELECTRICITY_PRICE) {
      this.costSeries = newValue;
      this.costYAxis = {
        opposite: false,
        title: {
          text: view.unitOfMeasurement
        }
      }
    } else if (view.viewType === Views.GRAPH_ELECTRICITY_CONSUMPTION) {
      this.usageSeries = newValue;
      this.usageYAxis = {
        opposite: true,
        title: {
          text: view.unitOfMeasurement
        }
      }
    }


    this.chartYAxis = []
    if (this.costYAxis) {
      this.chartYAxis.push(this.costYAxis);
    }
    if (this.usageYAxis) {
      this.chartYAxis.push(this.usageYAxis);
    }


    this.chartSeries = [
      ...this.costSeries,
      ...this.usageSeries
    ]
  }

  private transform(data: Array<DatedNumberValue>) {
   const transformed = data.map((value) => this.toSeriesData(value))
   return transformed
  }

  private toSeriesData(value: DatedNumberValue) {
    /*return {
      x: value.at,
      y: value.value,
      fillColor: null,
      strokeColor: null,
      meta: null,
      goals: null,
    }*/
    return {
        x: value.at,
        y: value.value,
      }
    
  }

  public fill = {
    type: ["gradient", "solid"],
    gradient: {
      //shade: 'dark',
      shadeIntensity: 0,
      colorStops: [
        [
          {
            offset: -100,
            color: '#370000', // Mørk rød
            opacity: 1
          },
          {
            offset: -20,
            color: '#ff0000', // Rød
            opacity: 1
          },
          {
            offset: 25,
            color: '#7d730d', // Gul
            opacity: 1
          },
          {
            offset: 80,
            color: '#00ff00', //Lysegrønn
            opacity: 1
          },
          {
            offset: 100,
            color: '#327d0d', // Mørkegrønn
            opacity: 1
          }

        ]
      ],
      type: 'vertical'
    }
  }

  public theme: ApexTheme = {
    mode: 'dark'
  }

  public colors = [
    '#FFA500', '#00a8e6'
  ]

}
