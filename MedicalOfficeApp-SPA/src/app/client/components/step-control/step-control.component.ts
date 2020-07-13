import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'app-step-control',
  templateUrl: './step-control.component.html',
  styleUrls: ['./step-control.component.scss'],
})
export class StepControlComponent implements OnInit {
  stepValue: number;
  minStepValue: number;
  maxStepValue: number;

  constructor(private stepService: StepService) {}

  ngOnInit() {
    this.stepService.currentStep$.subscribe((stepValue) => {
      this.stepValue = stepValue;
    });

    this.minStepValue = this.stepService.minStepValue;
    this.maxStepValue = this.stepService.maxStepValue;
  } // поправить название stepValue  в steps component

  nextStep(): void {
    this.stepService.nextStep();
  }

  previousStep(): void {
    this.stepService.previousStep();
  }
}
