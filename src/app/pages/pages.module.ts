import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageComponent } from './default-page/default-page.component';
import { DisplayPageComponent } from './display-page/display-page.component';
import { HelloPageComponent } from './hello-page/hello-page.component';
import { OfflinePageComponent } from './offline-page/offline-page.component';
import { ComponentsModule } from '../components/components.module';
import { IvyCarouselModule } from 'angular-responsive-carousel2';



@NgModule({
  declarations: [
    OfflinePageComponent,
    DefaultPageComponent,
    DisplayPageComponent,
    HelloPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IvyCarouselModule
  ]
})
export class PagesModule { }
