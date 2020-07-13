import { Component, OnInit } from '@angular/core';
import { StepService, Step } from '../../services/step.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  steps: Step[];
  currentStep: number;
  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.currentStep$.subscribe((stepValue) => this.currentStep = stepValue);
    this.steps = this.stepService.steps;
  }
}
