import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { steps } from './client/shared/models/stepModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MedicalOfficeApp-SPA';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setUpRouting();
  }

 setUpRouting(): void {
    import('./client/client.routes').then((routesFile) => {
      const routes: Routes = [];
      routes.push({path: '', redirectTo: steps[0].route.path, pathMatch: 'full'});
      steps.forEach((step) => routes.push(step.route));
      routesFile.clientRoutes[0].children = routes;
    });
 }
}
