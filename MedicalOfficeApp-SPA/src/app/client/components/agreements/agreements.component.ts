import { Component, OnInit, HostListener } from '@angular/core';
import { SaveComponent } from '../save/save.component';
import { StepService } from '../../services/step.service';
import { MoveType } from '../../shared/models/MoveTypeEnum';
import { PreventMoveBackService } from 'src/app/shared/services/prevent-move-back.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {
  @HostListener('window:unload', ['$event'])
  unload($event: any) {
    this.clientService.freeRecord();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
      $event.returnValue = true;
  }
  constructor(
    private stepService: StepService,
    private preventMoveBackService: PreventMoveBackService,
    private clientService: ClientService) { }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();
    this.stepService.StepPreparing(SaveComponent, MoveType.MoveNext);
  }
}
