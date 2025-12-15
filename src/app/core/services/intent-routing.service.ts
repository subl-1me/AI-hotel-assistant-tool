import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import {
  EntityNames,
  IntentsUrls,
  IntentKeys,
} from '../shared/utils/constants';
import Intent from '../models/Intent';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IntentRoutingService {
  constructor(private router: Router) {}

  routeBasedOnIntent(intentObj: Intent): void {
    // navigate based on intent
    const validIntent = Object.values(IntentKeys).find(
      (item) => intentObj.intent === item
    );

    console.log(intentObj);
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
          (entity) => entity.label === EntityNames.GUEST_NAME
        );

        if (includesGuestName) {
          params.guestName = includesGuestName.text.split(' ').join('-');
        }

        const url = IntentsUrls[validIntent as keyof typeof IntentsUrls];
        this.router.navigate([`${url}`], {
          queryParams: params,
        });

        break;
      default:
        console.log('invalid router entry.');
        break;
    }
  }
}
