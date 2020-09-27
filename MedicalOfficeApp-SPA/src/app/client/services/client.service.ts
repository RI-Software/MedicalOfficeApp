import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Observable, throwError} from 'rxjs';
import {Client} from '../../shared/models/Client';
import {ClientServiceModule} from './client-service.module';
import {Store} from '@ngrx/store';
import {clientPreregisterStatus, clientRegisterStatus} from '../store/clientStore/actions/client.actions';
import {ActionStatusesEnum} from '../shared/models/ActionStatusesEnum';

@Injectable({
  providedIn: ClientServiceModule
})
export class ClientService {
  constructor(
    private http: HttpClient,
    private store: Store) {}

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

  register(client: Client): Observable<object> {
    if (!client) {
      return throwError('No client data provided');
    }
    return this.http.post(environment.apiClientUrl + 'register', client);
  }

  freeRecord(): void {
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('Authorization', 'Bearer ' + token);
    navigator.sendBeacon(environment.apiClientUrl + 'freeRecord', formData);

    this.deleteToken();

    this.store.dispatch(clientPreregisterStatus({preregisterStatus: ActionStatusesEnum.Default}));
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }
}
