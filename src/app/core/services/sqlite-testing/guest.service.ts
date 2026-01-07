import { Injectable } from '@angular/core';
import Guest from '../../models/Guest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private http: HttpClient) {}

  searchGuestByNames(names: string): Observable<Guest[]> {
    return this.http.get<Guest[]>(
      `${environment.SQLITE_LOCAL_TESTING_DB}/guests/search/${names}`
    );
  }

  createGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(
      `${environment.SQLITE_LOCAL_TESTING_DB}/guests`,
      guest
    );
  }
}
