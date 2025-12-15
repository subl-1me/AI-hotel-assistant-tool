// shared-data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Intent from '../models/Intent';

@Injectable({
  providedIn: 'root',
})
export class TranscriptionNotifier {
  private notificationSubject = new Subject<Intent>();

  public notification$ = this.notificationSubject.asObservable();

  constructor() {}

  emitNotification(intent: Intent): void {
    this.notificationSubject.next(intent);
  }
}
