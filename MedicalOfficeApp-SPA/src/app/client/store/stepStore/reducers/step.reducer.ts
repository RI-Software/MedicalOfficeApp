import {StepState} from '../../../shared/models/StepState';
import {createReducer, on, Action} from '@ngrx/store';
import * as StepActions from '../actions/step.actions';


const initialState: StepState = {
  isBackBtnAvailable: false,
  isNextBtnAvailable: false,
  isNextBtnPressed: false,
  currentStep: 'time',
  steps: [
    {path: 'time', stepName: 'Time', icon: 'clock-circle'},
    {path: 'data', stepName: 'Data', icon: 'solution'},
    {path: 'agreements', stepName: 'Agreements', icon: 'file-text'},
    {path: 'save', stepName: 'Save', icon: 'save'},
    {path: 'done', stepName: 'Done', icon: 'check'},
  ]
};

const stepReducer = createReducer(
  initialState,
  on(StepActions.nextBtnAvailability, (state, {isAvailable}) => ({...state, isNextBtnAvailable: isAvailable})),
  on(StepActions.backBtnAvailability, (state, {isAvailable}) => ({...state, isBackBtnAvailable: isAvailable})),
  on(StepActions.stepBtnPressStatus, (state, {isPressed}) => ({...state, isNextBtnPressed: isPressed})),
  on(StepActions.step, (state, {path}) => ({...state, currentStep: path, isNextBtnAvailable: false, isNextBtnPressed: false}))
);

export function reducer(state: StepState | undefined, action: Action) {
  return stepReducer(state, action);
}