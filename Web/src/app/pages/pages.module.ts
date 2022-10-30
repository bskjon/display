import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageComponent } from './default-page/default-page.component';
import { DisplayPageComponent } from './display-page/display-page.component';
import { HelloPageComponent } from './hello-page/hello-page.component';
import { OfflinePageComponent } from './offline-page/offline-page.component';
import { ComponentsModule } from '../components/components.module';
import { IvyCarouselModule } from 'angular-responsive-carousel2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectingPageComponent } from './connecting-page/connecting-page.component';
import { ViewModule } from '../view/view.module';



@NgModule({
  declarations: [
    OfflinePageComponent,
    DefaultPageComponent,
    DisplayPageComponent,
    HelloPageComponent,
    ConnectingPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ViewModule,
    IvyCarouselModule,
    NgbModule
  ]
})
export class PagesModule { }
