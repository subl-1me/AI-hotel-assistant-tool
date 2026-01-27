import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import {
  EntityNames,
  IntentsUrls,
  IntentKeys,
} from '../shared/utils/constants';
import Intent from '../models/Intent';
import { INTENT_PATTERNS } from '../shared/utils/intents.config';
import Entity from '../models/Entity';

@Injectable({
  providedIn: 'root',
})
export class IntentService {
  constructor(private router: Router) {}

  public routeBasedOnIntent(intentObj: Intent): void {
    // navigate based on intent
    const validIntent = Object.values(IntentKeys).find(
      (item) => intentObj.intent === item,
    );

    const { entities, intent, intent_confidence, text } = intentObj;
    switch (validIntent) {
      // case SEARCHING FOR RESERVATION, CHECK-IN,
      case IntentKeys.SEARCH_RESERVATION:
        if (entities.length === 0) {
          const url = IntentsUrls[validIntent as keyof typeof IntentsUrls];
          this.router.navigate([`${url}`]);
        }

        const params: any = {};
        const includesGuestName = entities.find(
          (entity) => entity.label === EntityNames.GUEST_NAME,
        );

        if (includesGuestName) {
          params.guestName = includesGuestName.text.split(' ').join('-');
        }

        const url = IntentsUrls[validIntent as keyof typeof IntentsUrls];
        this.router.navigate([`${url}`], {
          queryParams: params,
        });
        break;
      case IntentKeys.AUTHENTICATE:
        this.router.navigate(['/authentication'], {
          queryParams: {
            confirmation:
              entities.find((entity) => entity.label === 'CONFIRMATION_NUMBER')
                ?.text || '',
          },
        });
        break;
      default:
        console.log(`No routing defined for intent: ${intent}`);
        break;
    }
  }

  public searchForIntent(transcription: string): Intent | null {
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
}
