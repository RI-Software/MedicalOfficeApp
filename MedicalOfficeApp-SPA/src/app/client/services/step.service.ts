import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ClientServiceModule} from './client-service.module';

@Injectable({
  providedIn: ClientServiceModule
})
export class StepService {

  constructor(private router: Router) {
  }

  navigateUser(path: string): void {
    this.router.navigate(['signup/' + path]);
  }
}
