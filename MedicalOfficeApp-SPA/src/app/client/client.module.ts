import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';
import { clientRoutes } from './client.routes';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes)
  ]
})
export class ClientModule { }
