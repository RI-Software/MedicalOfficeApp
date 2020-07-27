import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { DataComponent } from '../data/data.component';
import { MoveType } from '../../shared/models/MoveTypeEnum';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.StepPreparing(DataComponent, MoveType.MoveNext); // tmp
  }

}
