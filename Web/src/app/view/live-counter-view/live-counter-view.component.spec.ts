import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCounterViewComponent } from './live-counter-view.component';

describe('LiveCounterViewComponent', () => {
  let component: LiveCounterViewComponent;
  let fixture: ComponentFixture<LiveCounterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveCounterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveCounterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
