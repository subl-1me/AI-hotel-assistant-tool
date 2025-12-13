import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  constructor(private http: HttpClient) {}

  sendTextToModel(text: string): Observable<any> {
    return this.http.post(
      'http://localhost:5000/api/process-text',
      { text },
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
}
