import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AdminServiceModule} from './admin-service.module';

@Injectable({
  providedIn: AdminServiceModule
})
export class NavigationService {

  constructor(private router: Router) { }

  navigate(path: string) {
    this.router.navigate(['admin/' + path]);
  }
}
