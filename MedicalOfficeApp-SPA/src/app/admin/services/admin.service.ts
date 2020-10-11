import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {AdminServiceModule} from './admin-service.module';

@Injectable({
  providedIn: AdminServiceModule
})
export class AdminService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(environment.apiAdminLoginUrl, {
      username,
      password
    }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }
}
