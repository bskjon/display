import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';



@NgModule({
  declarations: [
    HtmlViewerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [HtmlViewerComponent]
})
export class ComponentsModule { }
