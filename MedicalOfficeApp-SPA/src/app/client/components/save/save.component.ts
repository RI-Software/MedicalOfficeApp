import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { DoneComponent } from '../done/done.component';
import { MoveType } from '../../shared/models/MoveTypeEnum';
import { ClientService } from '../../services/client.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PreventMoveBackService } from 'src/app/shared/services/prevent-move-back.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  constructor(
    private stepService: StepService,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private preventMoveBackService: PreventMoveBackService) { }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();

    const callback = (params: any): Promise<boolean> => {
      return new Promise(resolve => {
        this.clientService.register().subscribe(next => {
          this.notificationService.success('Super!');
          return true;
        }, error => {
          this.notificationService.error(error + '\n' + 'Try again.');
          return false;
        });
      });
    };

    this.stepService.StepPreparing(DoneComponent, MoveType.MoveNext, null, callback);
  }
}
