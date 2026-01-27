import { TestBed } from '@angular/core/testing';

import { IntentRoutingService } from './intent.service';

describe('IntentRoutingService', () => {
  let service: IntentRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntentRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
