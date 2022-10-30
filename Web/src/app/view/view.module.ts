import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { OverlayComponent } from './overlay/overlay.component';
import { LiveCounterViewComponent } from './live-counter-view/live-counter-view.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    HtmlViewerComponent,
    ElectricityComponent,
    OverlayComponent,
    LiveCounterViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    MatIconModule,
    ComponentsModule
  ],
  exports: [HtmlViewerComponent, ElectricityComponent, OverlayComponent, LiveCounterViewComponent]
})
export class ViewModule { }
