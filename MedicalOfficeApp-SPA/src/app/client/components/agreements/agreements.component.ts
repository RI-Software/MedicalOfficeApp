import { Component, OnInit } from '@angular/core';
import { SaveComponent } from '../save/save.component';
import { StepService } from '../../services/step.service';
import { MoveType } from '../../shared/models/MoveTypeEnum';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.StepPreparing(SaveComponent, MoveType.MoveNext);
  }

}
