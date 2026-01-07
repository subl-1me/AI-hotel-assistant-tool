import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Reservation from '../../models/Reservation';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  searchByGuestName(names: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      `${environment.SQLITE_LOCAL_TESTING_DB}/reservations/search/${names}`
    );
  }
}
