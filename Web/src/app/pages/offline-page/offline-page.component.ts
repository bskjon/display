import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Connectivity } from 'src/app/models/connectivity.enum';

@Component({
  selector: 'app-offline-page',
  templateUrl: './offline-page.component.html',
  styleUrls: ['./offline-page.component.scss']
})
export class OfflinePageComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.connectionState = Connectivity.OFFLINE;
  }

}
