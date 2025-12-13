// shared-data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranscriptionNotifier {
  private notificationSubject = new Subject<string>();

  public notification$ = this.notificationSubject.asObservable();

  constructor() {}

  emitNotification(text: string): void {
    this.notificationSubject.next(text);
  }
}
