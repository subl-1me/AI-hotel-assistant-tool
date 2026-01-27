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

  public classifyTranscription(transcription: string): Intent | null {
    const normalized = transcription.toLowerCase();
    for (const pattern of INTENT_PATTERNS) {
      if (pattern.regex.test(normalized)) {
        let entities: Entity[] = pattern.entites.map((entity) => {
          const match = normalized.match(entity.pattern);
          return {
            text: match ? match[0] : '',
            label: entity.name,
            start: match ? match.index || 0 : -1,
            end: match ? (match.index || 0) + match[0].length : -1,
          };
        });

        return {
          intent: pattern.type,
          source: 'regex',
          text: transcription,
          intent_confidence: 1,
          entities: entities,
        };
      }
    }

    return null;
  }

  // TODO: Move this shit from here
  emitIntent(intent: Intent): void {
    this.notificationSubject.next(intent);
  }
}
