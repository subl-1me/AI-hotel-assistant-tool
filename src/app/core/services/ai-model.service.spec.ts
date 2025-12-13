import { TestBed } from '@angular/core/testing';

import { AIModelService } from './ai-model.service';

describe('AIModelService', () => {
  let service: AIModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AIModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
