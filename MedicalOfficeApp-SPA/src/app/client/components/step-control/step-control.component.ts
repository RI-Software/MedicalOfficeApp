import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { MoveType } from '../../shared/models/MoveTypeEnum';

@Component({
  selector: 'app-step-control',
  templateUrl: './step-control.component.html',
  styleUrls: ['./step-control.component.scss'],
})
export class StepControlComponent implements OnInit {
  previousButtonIsActive = false;
  nextButtonIsActive = false;

  constructor(private stepService: StepService) {}

  ngOnInit() {
    this.stepService.moveType.subscribe((moveType) => {
      switch (moveType) {
        case MoveType.None: {
          this.buttonsAvailable(false, false);
          break;
        }
        case MoveType.MoveNext: {
          this.buttonsAvailable(false, true);
          break;
        }
        case MoveType.MovePrevious: {
          this.buttonsAvailable(true, false);
          break;
        }
        case MoveType.MoveAny: {
          this.buttonsAvailable(true, true);
          break;
        }
      }
    });
  }

  private buttonsAvailable(previousButtonIsActive: boolean = false, nextButtonIsActive: boolean = false): void {
    this.previousButtonIsActive = previousButtonIsActive;
    this.nextButtonIsActive = nextButtonIsActive;
  }

  step() {
    this.stepService.Step();
  }
}
