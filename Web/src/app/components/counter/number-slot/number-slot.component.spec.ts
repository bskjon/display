import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSlotComponent } from './number-slot.component';

describe('NumberSlotComponent', () => {
  let component: NumberSlotComponent;
  let fixture: ComponentFixture<NumberSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberSlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
