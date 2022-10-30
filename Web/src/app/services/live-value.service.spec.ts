import { TestBed } from '@angular/core/testing';

import { LiveValueService } from './live-value.service';

describe('LiveValueService', () => {
  let service: LiveValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
