import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  public error(body: string): void{
    this.notification.error(
      'Ops, an error occured',
      body,
      { nzPlacement: 'bottomRight' }
    );
  }

  public info(body: string): void {
    this.notification.info(
      'This might be interesting',
      body,
      {nzPlacement: 'bottomRight'}
    );
  }

  public success(body: string): void {
    this.notification.success(
      'Success!!!',
      body,
      {nzPlacement: 'bottomRight'}
    );
  }
}
