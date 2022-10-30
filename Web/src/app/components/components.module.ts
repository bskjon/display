import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { CounterComponent } from './counter/counter.component';
import { NumberSlotComponent } from './counter/number-slot/number-slot.component';



@NgModule({
  declarations: [
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
  exports: [CounterComponent]
})
export class ComponentsModule { }
