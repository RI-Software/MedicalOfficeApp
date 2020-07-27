import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { DoneComponent } from '../done/done.component';
import { MoveType } from '../../shared/models/MoveTypeEnum';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.StepPreparing(DoneComponent, MoveType.MoveNext); // tmp
  }

}
