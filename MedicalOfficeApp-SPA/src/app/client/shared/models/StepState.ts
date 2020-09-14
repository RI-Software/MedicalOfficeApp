import {Step} from './Step';

export interface StepState {
  isNextBtnAvailable: boolean;
  isBackBtnAvailable: boolean;
  isNextBtnPressed: boolean;
  currentStep: string;
  steps: Step[];
}
