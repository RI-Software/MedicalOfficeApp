import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Client } from '../shared/models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  client: Client;

  preregister(selectedDate: Date, selectedTime: string): Observable<void> {
    return this.http.post(environment.apiClientUrl + 'preregister', {
      date: selectedDate.toDateString(),
      time: selectedTime
    }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  register(): Observable<object> {
    if (!this.client) {
      return throwError('No client data provided');
    }
    return this.http.post(environment.apiClientUrl + 'register', this.client);
  }

  freeRecord(): void {
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('Authorization', 'Bearer ' + token);
    navigator.sendBeacon(environment.apiClientUrl + 'freeRecord', formData);

    this.deleteToken();
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }
}
