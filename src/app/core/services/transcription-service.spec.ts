import { TestBed } from '@angular/core/testing';

import { TranscriptionService } from './transcription-service';

describe('TranscriptionNotifierService', () => {
  let service: TranscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
