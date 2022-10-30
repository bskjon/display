import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IvyCarouselModule } from 'angular-responsive-carousel2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ViewModule } from './view/view.module';
import { PagesModule } from './pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ComponentsModule,
    ViewModule,
    IvyCarouselModule,
    NgbModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
