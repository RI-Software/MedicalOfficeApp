import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ClientServiceModule} from '../../client/services/client-service.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService) {
  }

  static getTokenString(): string {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any | null {
    const tokenString = AuthService.getTokenString();
    if (tokenString) {
      return this.jwtHelperService.decodeToken(tokenString);
    }
    return null;
  }

  getTokenExpirationTime(): Date | null {
    const tokenString = AuthService.getTokenString();
    if (tokenString) {
      return this.jwtHelperService.getTokenExpirationDate(tokenString);
    }
    return null;
  }

  getUserRoles(): string[] | null {
    const token = this.getDecodedToken();

    if (token) {
      return Array.isArray(token.role) ? token.role : [token.role];
    }

    return null;
  }

  isTokenValid(roleToBeChecked?: string): boolean {

    if (roleToBeChecked) {
      const roles = this.getUserRoles();

      if (!roles || !roles.find((role: string) => role === roleToBeChecked)) {
        return false;
      }
    }

    const tokenString = AuthService.getTokenString();

    return !this.jwtHelperService.isTokenExpired(tokenString);
  }
}
