import { Component, OnInit } from '@angular/core';
import { SaveComponent } from '../save/save.component';
import { StepService } from '../../services/step.service';
import { MoveType } from '../../shared/models/MoveTypeEnum';
import { PreventMoveBackService } from 'src/app/shared/services/prevent-move-back.service';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {

  constructor(
    private stepService: StepService,
    private preventMoveBackService: PreventMoveBackService
    ) { }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();
    this.stepService.StepPreparing(SaveComponent, MoveType.MoveNext);
  }

}
