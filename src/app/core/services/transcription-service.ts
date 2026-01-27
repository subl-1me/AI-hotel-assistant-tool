// shared-data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Intent from '../models/Intent';
import { INTENT_PATTERNS } from '../shared/utils/intents.config';
import Entity from '../models/Entity';

@Injectable({
  providedIn: 'root',
})
export class TranscriptionService {
  private notificationSubject = new Subject<Intent>();

  public notification$ = this.notificationSubject.asObservable();

  constructor() {}

  // TODO: Move this shit from here
  emitIntent(intent: Intent): void {
    this.notificationSubject.next(intent);
  }
}
