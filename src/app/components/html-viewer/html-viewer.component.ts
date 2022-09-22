import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss']
})
export class HtmlViewerComponent implements OnInit {
  @Input() public url: string = "https://threatmap.checkpoint.com/"

  public safeUrl: SafeResourceUrl = "";

  public HtmlView: any;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    //this.http.get(this.url, {responseType: 'text'}).subscribe(res => this.HtmlView = this.sanitizer.bypassSecurityTrustHtml(res))
  }

}
