import {Step} from './Step';
import {AvailableDate, AvailableTime} from './Date&Times';

export interface StepState {
  isNextBtnAvailable: boolean;
  isBackBtnAvailable: boolean;
  isNextBtnPressed: boolean;
  currentStep: string;
  availableDates: AvailableDate[];
  availableTime: AvailableTime[];
  steps: Step[];
}
