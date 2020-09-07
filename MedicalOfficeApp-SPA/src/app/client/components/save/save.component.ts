import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { MoveType } from '../../shared/models/MoveTypeEnum';
import { ClientService } from '../../services/client.service';
import { Client } from '../../shared/models/Client';
import { PreventMoveBackService } from 'src/app/shared/services/prevent-move-back.service';
import { TimeComponent } from '../time/time.component';
import { DataComponent } from '../data/data.component';
import { AuthService } from '../../services/auth.service';
import { DateTime } from '../../shared/models/Date&Times';
import { DoneComponent } from '../done/done.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  client: Client;
  dateTime: DateTime;

  constructor(
    private stepService: StepService,
    private clientService: ClientService,
    private preventMoveBackService: PreventMoveBackService,
    private authService: AuthService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();

    this.client = this.clientService.client;

    const token = this.authService.token;
    this.dateTime = {
      date: token.date,
      time: token.time
    };

    const callback = (params: any): Promise<boolean> => {
      return new Promise(resolve => {
        this.clientService.register().subscribe(next => {
          resolve(true);
        }, error => {
          this.notificationService.error(error + '\n' + 'Try again.');
          resolve(false);
        });
      });
    };
    this.stepService.StepPreparing(DoneComponent, MoveType.MoveNext, null, callback);
  }

  dateTimeEditBtnPressed() {
    this.stepService.StepPreparing(TimeComponent, MoveType.MovePrevious);
    this.clientService.freeRecord();
    this.stepService.Step();
  }

  clientEditBtnPressed() {
    this.stepService.StepPreparing(DataComponent, MoveType.MovePrevious);
    this.stepService.Step();
  }
}
