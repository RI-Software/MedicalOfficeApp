import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { Client } from '../shared/models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

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

  register(clientToBeCreated: Client): Observable<object> {
    const token = localStorage.getItem('token');
    return this.http.post(environment.apiClientUrl + 'register', clientToBeCreated);
  }
}
