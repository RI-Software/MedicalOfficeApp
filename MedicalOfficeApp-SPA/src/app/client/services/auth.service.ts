import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ClientServiceModule} from './client-service.module';

@Injectable({
  providedIn: ClientServiceModule
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService) {
  }

  getDecodedToken(): any | null {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      return this.jwtHelperService.decodeToken(tokenString);
    }
    return null;
  }

  getTokenExpirationTime(): Date | null {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      return this.jwtHelperService.getTokenExpirationDate(tokenString);
    }
    return null;
  }
}
