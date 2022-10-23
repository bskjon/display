import { Component } from '@angular/core';
import { AppService } from './app.service';
import { OverlayService } from './services/overlay.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'display';

  constructor(
    private appService: AppService,
    private socket: SocketService,
    public overlayService: OverlayService
  ) {
    this.socket.connect();
  }
}
