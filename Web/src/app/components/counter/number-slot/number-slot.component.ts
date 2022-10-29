import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-number-slot',
  templateUrl: './number-slot.component.html',
  styleUrls: ['./number-slot.component.scss']
})
export class NumberSlotComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild("slot", { static: false }) slot: ElementRef;

  @Input() number: number = 2

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.changeNumber();
  }

  private offset(): string {
    return "-" + this.number + "00%";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeNumber();
  }

  public changeNumber(): void {
    this.renderer.setStyle(this.slot.nativeElement, "transform", `translateY(${this.offset()})`)

  }

}
