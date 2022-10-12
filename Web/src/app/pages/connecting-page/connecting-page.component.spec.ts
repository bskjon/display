import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectingPageComponent } from './connecting-page.component';

describe('ConnectingPageComponent', () => {
  let component: ConnectingPageComponent;
  let fixture: ComponentFixture<ConnectingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
