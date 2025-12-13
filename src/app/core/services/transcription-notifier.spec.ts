import { TestBed } from '@angular/core/testing';

import { TranscriptionNotifier } from './transcription-notifier.service';

describe('TranscriptionNotifierService', () => {
  let service: TranscriptionNotifier;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriptionNotifier);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
