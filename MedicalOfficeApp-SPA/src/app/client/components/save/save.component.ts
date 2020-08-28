import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { DoneComponent } from '../done/done.component';
import { MoveType } from '../../shared/models/MoveTypeEnum';
import { ClientService } from '../../services/client.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  constructor(
    private stepService: StepService,
    private clientService: ClientService,
    private notificationService: NotificationService) { }

  ngOnInit() {

    const callback = (params: any): boolean => {
      this.clientService.register().subscribe(next => {
        this.notificationService.success('Super!');
      }, error => {
        this.notificationService.error(error + '\n' + 'Try again.');
        return false;
      });

      return true;
    };

    this.stepService.StepPreparing(DoneComponent, MoveType.MoveNext, null, callback);
  }
}
