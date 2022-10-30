import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss']
})
export class HtmlViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('frame') frame: ElementRef;
  @Input() public url: string = "";
  @Input() public type?: string = undefined;

  public safeUrl: SafeResourceUrl = "";

  public HtmlView: any;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (this.url.length == 0) {
      this.url = "https://threatmap.checkpoint.com/"
    }
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    //this.http.get(this.url, {responseType: 'text'}).subscribe(res => this.HtmlView = this.sanitizer.bypassSecurityTrustHtml(res))
  }

  ngAfterViewInit(): void {
      if (this.frame != null) {
        const cw = this.frame.nativeElement.contentWindow
        //print(cw)
      }
  }

}
