import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  currentStep = 0;
  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.currentStep$.subscribe((stepValue) => this.currentStep = stepValue);
  }
}
