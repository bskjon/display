import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Input, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChange, SimpleChanges, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { isNil } from 'lodash';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NumberSlotComponent } from './number-slot/number-slot.component';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChildren(NumberSlotComponent) private slots: QueryList<NumberSlotComponent>;
  @Input() public value: number = 0o0;
  
  
  private values: Array<number> = new Array<number>();
  public valueSlotCounts: Array<number> = new Array<number>();
  private max = 9999;

  private sub: Subscription|null = null;
  constructor(
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const splitted = String(this.value).split('').map(str => Number(str));
    this.increaseCounterIfNeeded(splitted.length);
    this.updateNumberSlots();
  }

  private increaseCounterIfNeeded(newLength: number): void {
    if (this.valueSlotCounts.length < newLength) {
      this.valueSlotCounts = (Array(newLength).fill(0))
      this.changeRef.detectChanges();
    }
  }

  private _hasBeenLessCount = 0
  private reduceCounterIfNeeded(newLength: number): void {
    if (this.valueSlotCounts.length > newLength) {
      this._hasBeenLessCount++

      if (this._hasBeenLessCount > 5) {
        this.valueSlotCounts = (Array(newLength).fill(0))
        this.changeRef.detectChanges();
        this._hasBeenLessCount = 0;
      }
    }
  }

  private updateNumberSlots() {
    const toChange = this.slots.toArray().slice(-this.values.length);
    const resetToZero = this.slots.toArray().filter((it) => !toChange.includes(it) && it.number != 0);
    if (resetToZero.length > 0) {
      console.log("Resetting some slots")
    }
    resetToZero?.forEach((element, index) => {
        element.number = 0;
        element.changeNumber();
    })
    toChange.forEach((element, index) => {
      const newNumber = this.values[index];
      if (!isNil(newNumber)) {
        element.number = newNumber;
        element.changeNumber();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNil(changes['value'])) {
      const valueOfChange: number = changes['value'].currentValue;
      const splitted = String(valueOfChange).split('').map(str => Number(str));
      this.increaseCounterIfNeeded(splitted.length);
      this.reduceCounterIfNeeded(splitted.length);
      this.values = splitted;
      this.updateNumberSlots();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  protected add() {
    this.max = Number(`9${this.max}`);
    this.shuffle(); 
  }

  public shuffle() {
    // console.error("Hello from shuffle");
    const nextNumber = Math.floor(Math.random() * (this.max - 0) + 0);
    console.log("Next number: " + nextNumber);
    const smc = new SimpleChange(this.value, nextNumber, false)
    const mock: SimpleChanges = {
      "value": smc
    }
    this.ngOnChanges(mock)

  }
}
