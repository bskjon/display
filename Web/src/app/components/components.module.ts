import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { OverlayComponent } from './overlay/overlay.component';
import { CounterComponent } from './counter/counter.component';
import { NumberSlotComponent } from './counter/number-slot/number-slot.component';



@NgModule({
  declarations: [
    HtmlViewerComponent,
    ElectricityComponent,
    OverlayComponent,
    CounterComponent,
    NumberSlotComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    MatIconModule
  ],
  exports: [HtmlViewerComponent, ElectricityComponent, OverlayComponent, CounterComponent]
})
export class ComponentsModule { }
