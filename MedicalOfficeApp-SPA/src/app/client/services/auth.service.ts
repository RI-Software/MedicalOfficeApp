import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService) { }

  private _token;

  public get token() {
    return this.decodeToken();
  }

  private decodeToken(): any | null {
    const tokenString = localStorage.getItem('token');
    if (tokenString){
      return this.jwtHelperService.decodeToken(tokenString);
    }
  }
}
