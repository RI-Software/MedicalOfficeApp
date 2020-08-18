import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './components/login/login.component';

export const amdinRoutes: Routes = [
    {path: '', component: AdminComponent, children: [
        {path: '', component: LoginComponent}
    ]}
];
