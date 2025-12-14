import { Routes } from '@angular/router';
import { HomePageComponent } from './core/features/home/pages/home-page/home-page.component';
import { ReservationListComponent } from './core/features/reservation-list/pages/reservation-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'reservation-list',
    component: ReservationListComponent,
  },
];
