import {State} from '../../../../shared/models/State';
import {createSelector} from '@ngrx/store';
import {StepState} from '../../../shared/models/StepState';
import {clientModuleFeatureKey} from '../../index';

export const selectStep = (state: State) => state[clientModuleFeatureKey].step;

export const selectNextBtnValue = createSelector(
  selectStep,
  (state: StepState) => state.isNextBtnAvailable
);

export const selectSteps = createSelector(
  selectStep,
  (state: StepState) => state.steps
);

export const selectCurrentStepIndex = createSelector(
  selectStep,
  (state: StepState) => state.steps.findIndex((step) => {
      return step.path === state.currentStep;
  })
);

export const selectIsNextBtnPressed = createSelector(
  selectStep,
  (state: StepState) => state.isNextBtnPressed
);

export const selectCurrentStep = createSelector(
  selectStep,
  (state: StepState) => state.currentStep
);
