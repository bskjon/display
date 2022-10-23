import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { OverlayComponent } from './overlay/overlay.component';



@NgModule({
  declarations: [
    HtmlViewerComponent,
    ElectricityComponent,
    OverlayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    MatIconModule
  ],
  exports: [HtmlViewerComponent, ElectricityComponent, OverlayComponent]
})
export class ComponentsModule { }
