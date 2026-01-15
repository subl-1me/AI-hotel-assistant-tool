import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  constructor(private http: HttpClient) {}

  sendTextToModel(text: string): Observable<any> {
    return this.http.post(
      environment.TEXT_MODEL_PROCESSING_API_URL,
      { text },
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
}
